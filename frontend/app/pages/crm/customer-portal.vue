<template>
  <div class="space-y-6">
    <!-- Header (Premium Portal Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-cyan-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Portal Admin</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-cyan-600">Provisioning Core</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Customer <span class="text-cyan-600 italic text-3xl">Portal</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Pusat manajemen hak akses Login Digital Klien (*Portal Provisioning*) dan pemantauan interaksi mereka (Invoices, Quotations) secara real-time.</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
             <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gateway Online</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Component Alert -->
    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- High-Contrast KPI Banners (Premium style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
       <!-- Primary engagement banner -->
      <div class="p-4 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between border border-slate-800 transition-all hover:bg-slate-950 group">
        <div class="text-[10px] font-black uppercase text-cyan-400 tracking-[0.2em] mb-4 opacity-80">Telemetry Hits</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter">{{ summary.engagementLogs || 0 }}</h3>
          <div class="p-3 bg-slate-700 rounded-xl text-slate-100 shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-rss text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Total Clients</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-800 tracking-tighter">{{ summary.totalCustomers || 0 }}</h3>
          <div class="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100"><i class="pi pi-users text-lg"></i></div>
        </div>
      </div>
      
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-cyan-600 tracking-[0.2em] mb-4">Provisioned Access</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-cyan-700 tracking-tighter">{{ summary.portalUsers || 0 }}</h3>
          <div class="p-3 bg-cyan-50 text-cyan-600 rounded-xl border border-cyan-100"><i class="pi pi-shield text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em] mb-4">Adoption Rate</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-600 tracking-tighter">{{ Math.round((summary.portalUsers / summary.totalCustomers) * 100) || 0 }}<span class="text-xl">%</span></h3>
          <div class="p-3 bg-emerald-50 text-emerald-500 rounded-xl border border-emerald-100"><i class="pi pi-chart-bar text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Modern Tab Navigation (Premium Segmented Style) -->
    <div class="bg-indigo-50/50 p-1.5 rounded-3xl border border-indigo-100 flex items-center gap-2 max-w-fit mx-auto lg:mx-0">
      <button v-for="t in [
        { id: 'access', label: 'Access Management', icon: 'pi-shield' },
        { id: 'logs', label: 'Telemetry Stream', icon: 'pi-rss' }
      ]" :key="t.id"
        @click="activeTab = t.id === 'logs' ? (loadLogs(), 'logs') : 'access'"
        :class="activeTab === t.id ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-white hover:shadow-sm'"
        class="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300">
        <i :class="['pi text-xs', t.icon]"></i>
        {{ t.label }}
      </button>
    </div>

    <!-- TAB 1: Access Management Grid -->
    <div v-if="activeTab === 'access'" class="space-y-6 animate-fade-in-up">
       <!-- Controls -->
       <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-wrap gap-4 items-center">
         <div class="relative flex-1 max-w-sm">
            <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <InputText v-model="q" placeholder="Cari ID Pelanggan..." class="w-full pl-10 h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white transition-all text-sm font-bold shadow-inner" @keyup.enter="load" :disabled="!canRead" />
         </div>
         <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" class="h-12 w-12 border-slate-200 text-slate-500 hover:text-indigo-600 transition-all" :disabled="!canRead" />
       </div>

       <!-- TABLE -->
       <div class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up">
         <table class="w-full text-sm">
           <thead class="bg-slate-50/80 text-left">
             <tr>
               <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">B2B Customer Entity</th>
               <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Portal Administrator</th>
               <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Docs Vitality</th>
               <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-40">Portal Status</th>
               <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-44">Credentials</th>
             </tr>
           </thead>
           <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
               <td colspan="5" class="py-24 text-center">
                 <i class="pi pi-spinner pi-spin text-4xl text-cyan-600 opacity-20"></i>
                 <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-cyan-600">Syncing portals...</div>
               </td>
             </tr>
             <tr v-for="c in customers" v-else :key="c.id" class="transition-all hover:bg-slate-50/50 group border-l-4" :style="{ borderLeftColor: getEdgeColor(c) }">
               <td class="px-8 py-6 align-middle">
                 <div class="flex flex-col gap-1.5">
                   <div class="font-black text-slate-900 text-[14px] tracking-tight leading-tight uppercase">{{ c.name?.toLowerCase() }}</div>
                   <div class="font-mono text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 flex items-center gap-2 self-start">
                     <i class="pi pi-id-card text-[9px]"></i> {{ c.code }}
                   </div>
                 </div>
               </td>
               
               <td class="px-6 py-6 align-middle border-l border-slate-50/50">
                  <div v-if="c.portalUsers && c.portalUsers.length > 0" class="flex flex-col gap-2">
                     <div v-for="pu in c.portalUsers" :key="pu.id" class="text-[11px] font-black text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm italic lowercase overflow-hidden">
                        <i class="pi pi-at text-[10px] text-cyan-500"></i> {{ pu.email }}
                     </div>
                  </div>
                  <div v-else class="text-[10px] font-black text-slate-300 uppercase tracking-widest italic flex items-center gap-2">
                    <i class="pi pi-info-circle text-xs opacity-50"></i> UNPROVISIONED
                  </div>
               </td>
 
               <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-center">
                 <div class="flex flex-col gap-2 items-center justify-center">
                    <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">{{ c._count?.salesQuotations || 0 }} QUOTES</div>
                    <div class="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 shadow-sm">{{ c._count?.salesInvoices || 0 }} INVOICES</div>
                 </div>
               </td>
 
               <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-center">
                 <div v-if="c.portalUsers?.length > 0" :class="getBadge(c.portalUsers[0].portalStatus)" class="min-w-[110px] inline-flex items-center justify-center py-2 rounded-2xl border shadow-sm">
                   <i class="pi pi-circle-fill text-[6px] mr-2 animate-pulse" v-if="c.portalUsers[0].portalStatus === 'ACTIVE'"></i>
                   {{ c.portalUsers[0].portalStatus }}
                 </div>
                 <div v-else class="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] py-2 px-3 border border-slate-100 rounded-2xl bg-slate-50 inline-block">NO ACCESS</div>
               </td>
               
               <td class="px-8 py-6 align-middle border-l border-slate-50/50 text-right">
                 <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                   <Button v-if="c.portalUsers?.length === 0" icon="pi pi-send" label="Provision" size="small" class="p-button-rounded h-10 px-6 bg-slate-900 border-none text-white font-black text-[9px] uppercase shadow-lg shadow-slate-200 hover:scale-105 active:scale-95 transition-all" @click="openProvision(c)" />
                   <Button v-if="c.portalUsers?.length > 0 && c.portalUsers[0].portalStatus !== 'SUSPENDED'" icon="pi pi-ban" label="Revoke" size="small" class="p-button-rounded h-10 px-6 bg-rose-50 border border-rose-100 text-rose-600 font-black text-[9px] uppercase shadow-sm hover:bg-rose-100 transition-all" @click="revokeAccess(c.portalUsers[0].id)" />
                   <Button v-if="c.portalUsers?.length > 0 && c.portalUsers[0].portalStatus === 'SUSPENDED'" icon="pi pi-refresh" label="Restore" size="small" class="p-button-rounded h-10 px-6 bg-emerald-50 border border-emerald-100 text-emerald-600 font-black text-[9px] uppercase shadow-sm hover:bg-emerald-100 transition-all" @click="openProvision(c)" />
                 </div>
               </td>
             </tr>
             <tr v-if="!loading && customers.length === 0">
               <td colspan="5" class="py-32 text-center text-slate-400 italic text-sm font-medium">
                 <i class="pi pi-inbox text-5xl opacity-10 mb-4 block"></i>
                 <div class="text-[10px] font-black uppercase tracking-[0.2em]">Data Klien Kosong / Mis-filter</div>
               </td>
             </tr>
           </tbody>
         </table>
       </div>
    </div>

    <!-- TAB 2: Telemetry Stream (Logs) -->
    <div v-if="activeTab === 'logs'" class="space-y-6 animate-fade-in-up">
       <div v-if="loadingLogs" class="py-24 text-center">
         <i class="pi pi-spinner pi-spin text-4xl text-cyan-600 opacity-20"></i>
       </div>
       
       <div v-if="!loadingLogs && logs.length === 0" class="py-32 text-center border-2 border-dashed rounded-3xl bg-slate-50/50 text-slate-300 border-slate-200">
           <i class="pi pi-inbox text-5xl mb-4 block"></i>
           <div class="text-[10px] font-black uppercase tracking-[0.2em]">No telemetry data available for this cycle.</div>
       </div>
 
       <div v-else class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col divide-y divide-slate-50">
          <div v-for="lg in logs" :key="lg.id" class="p-4 flex items-start gap-4 hover:bg-slate-50/80 transition-all group">
              <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border-2 border-white group-hover:rotate-6 transition-transform transition-all duration-300', getLogIcon(lg.activityType).bg]">
                  <i :class="['pi text-2xl', getLogIcon(lg.activityType).icon]"></i>
              </div>
              <div class="flex-1">
                 <div class="text-[14px] font-black text-slate-900 tracking-tight leading-tight uppercase group-hover:text-cyan-700 transition-colors">
                    {{ lg.user?.customer?.name?.toLowerCase() }} <span class="text-slate-300 mx-2 text-xs font-normal text-none">/</span> <span class="text-cyan-600 italic lowercase font-bold">{{ lg.user?.email }}</span>
                 </div>
                 <div class="text-sm font-medium text-slate-500 mt-2 leading-relaxed max-w-2xl">{{ lg.description }}</div>
                 <div class="mt-4 flex items-center gap-4">
                    <span class="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest"><i class="pi pi-clock text-[9px]"></i> {{ formatDateTime(lg.createdAt) }}</span>
                    <span class="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">Activity: {{ lg.activityType }}</span>
                 </div>
              </div>
          </div>
       </div>
    </div>


    <!-- Dialog Invite Provisioning (Premium Security Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-md rounded-[2.5rem] bg-white shadow-2xl overflow-hidden animate-scale-in border-4 border-white">
        <!-- Dialog Header -->
        <div class="p-8 border-b flex justify-between items-center bg-slate-900 text-white relative">
           <div class="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-transparent"></div>
           <div class="relative flex items-center gap-4">
              <div class="w-12 h-12 rounded-[1rem] bg-cyan-500 flex items-center justify-center text-white shadow-lg rotate-3">
                 <i class="pi pi-shield text-xl animate-pulse"></i>
              </div>
              <div>
                 <h3 class="text-sm font-black uppercase tracking-[0.2em] leading-none">Access Control Hub</h3>
                 <p class="text-[9px] font-bold text-cyan-400 uppercase tracking-widest mt-1">Portal Provisioning Center</p>
              </div>
           </div>
           <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="text-white hover:bg-white/10 shrink-0" />
        </div>
        
        <!-- Dialog Body -->
        <div class="p-10 space-y-8 bg-slate-50/30">
           <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Account</div>
              <div class="text-sm font-black text-slate-800 uppercase tracking-tight">{{ targetCustomer?.name }}</div>
           </div>
           
           <div class="space-y-2">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">PIC Email Gateway <span class="text-rose-500">*</span></label>
             <input type="email" v-model="inviteEmail" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-cyan-100 outline-none transition-all placeholder:italic" :placeholder="targetCustomer?.email || 'admin@client.com'" />
             <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-3 px-1 border-l-2 border-cyan-500">Tautan aktivasi rahasia akan dikirimkan ke alamat ini untuk verifikasi identitas.</p>
           </div>
        </div>

        <!-- Dialog Footer -->
        <div class="p-8 bg-white border-t flex justify-end gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="px-8 font-black text-[10px] uppercase tracking-widest h-14" :disabled="saving" />
          <Button label="Dispatch Portal Invite" :loading="saving" :disabled="!inviteEmail"
            @click="sendInvite" class="p-button-rounded h-14 px-10 bg-cyan-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-cyan-100 hover:scale-105 transition-all" icon="pi pi-send" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';

const api = useApi();
const auth = useAuthStore();

const canRead = auth.hasPermission('crm.portal.read') || true;

const q = ref('');
const activeTab = ref('access');
const loading = ref(false);
const loadingLogs = ref(false);
const saving = ref(false);

const error = ref('');
const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const customers = ref<any[]>([]);
const logs = ref<any[]>([]);
const summary = ref<any>({});

const dialogOpen = ref(false);
const targetCustomer = ref<any>(null);
const inviteEmail = ref('');

function pad(n: number) { return String(n).padStart(2, '0'); }
function formatDateTime(iso: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${pad(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const getEdgeColor = (c: any) => {
   if (!c.portalUsers || c.portalUsers.length === 0) return '#cbd5e1';
   const st = c.portalUsers[0].portalStatus;
   if (st === 'ACTIVE') return '#0ea5e9';
   if (st === 'SUSPENDED') return '#e11d48';
   return '#f59e0b'; // PENDING
};

const getBadge = (st: string) => {
   if (st === 'ACTIVE') return 'text-[10px] font-black uppercase px-2 py-1 rounded bg-emerald-100 text-emerald-700 border border-emerald-200';
   if (st === 'SUSPENDED') return 'text-[10px] font-black uppercase px-2 py-1 rounded bg-rose-100 text-rose-700 border border-rose-200';
   return 'text-[10px] font-black uppercase px-2 py-1 rounded bg-amber-100 text-amber-700 border border-amber-200';
};

const getLogIcon = (type: string) => {
   if (type === 'LOGIN') return { icon: 'pi-sign-in text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
   if (type === 'INVOICE_VIEW') return { icon: 'pi-receipt text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' };
   if (type === 'ADMIN_INVITE') return { icon: 'pi-send text-cyan-600', bg: 'bg-cyan-50 border-cyan-200' };
   if (type === 'ADMIN_REVOKE') return { icon: 'pi-ban text-rose-600', bg: 'bg-rose-50 border-rose-200' };
   return { icon: 'pi-star text-amber-600', bg: 'bg-amber-50 border-amber-200' };
};

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    const { data } = await api.get('/crm/portal/users', { params });
    customers.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loading.value = false;
  }
}

async function loadLogs() {
  loadingLogs.value = true;
  try {
    const { data } = await api.get('/crm/portal/activities');
    logs.value = data.data || [];
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loadingLogs.value = false;
  }
}

function openProvision(c: any) {
   targetCustomer.value = c;
   inviteEmail.value = c.email || '';
   dialogOpen.value = true;
}

async function sendInvite() {
   saving.value = true;
   try {
      await api.post('/crm/portal/invite', { customerCode: targetCustomer.value.code, email: inviteEmail.value });
      showMsg(success, 'Tautan otorisasi berhasil dikirim ke Klien!');
      dialogOpen.value = false;
      load();
   } catch(e:any) {
      showMsg(error, e.response?.data?.message || e.message);
   } finally { saving.value = false; }
}

async function revokeAccess(portalUserId: string) {
   if (!confirm('Cabut hak akses Customer ini secara permanen?')) return;
   try {
      await api.post('/crm/portal/revoke', { portalUserId });
      showMsg(success, 'Hak akses telah diterminasi.');
      load();
   } catch(e:any) {
      showMsg(error, e.message);
   }
}

onMounted(() => {
  if (canRead) load();
});
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
