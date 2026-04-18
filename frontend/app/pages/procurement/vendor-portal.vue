<template>
  <div class="space-y-6">
    <!-- Header (Premium Connectivity Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-teal-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-teal-400">Connectivity Core</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-teal-600">B2B Collaboration Node</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Administrasi <span class="text-teal-600 italic text-3xl">Portal Pemasok</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Manajemen hak akses Ekstranet e-Procurement. Kelola provisioning akun vendor, pantau interaksi bidding, dan audit telemetri aktivitas secara real-time.</p>
        </div>
      </div>
    </div>

    <!-- Dynamic Portal KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up mt-4">
      <div class="p-6 rounded-2xl bg-teal-600 text-white shadow-xl flex flex-col justify-between border border-teal-500 transition-all hover:bg-teal-700 group">
        <div class="text-[10px] font-black uppercase text-teal-200 tracking-[0.2em] mb-4 opacity-80">Total Rekanan Pemasok</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ summary.totalSuppliers || 0 }}</h3>
          <div class="p-3 bg-white/20 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-briefcase text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-teal-600 tracking-[0.2em] mb-4">Akses Portal Diberikan</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-teal-700 tracking-tighter leading-none">{{ summary.portalUsers || 0 }}</h3>
          <div class="p-3 bg-teal-50 text-teal-600 rounded-xl border border-teal-100"><i class="pi pi-key text-lg"></i></div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Tingkat Adopsi B2B</div>
        <div class="flex flex-col items-start gap-1">
          <h3 class="text-4xl font-black text-indigo-700 tracking-tighter leading-none">{{ Math.round((summary.portalUsers / (summary.totalSuppliers || 1)) * 100) }}<span class="text-xl text-indigo-300 ml-1">%</span></h3>
          <div class="text-[9px] font-black text-indigo-500 uppercase tracking-widest leading-none mt-1">Expansion Target: 100%</div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between transition-all hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4 relative z-10">Aktivitas Telemetri (24j)</div>
        <div class="flex items-end justify-between relative z-10">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ summary.engagementLogs || 0 }}</h3>
          <div class="p-3 bg-white/5 text-teal-400 rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-wifi text-lg animate-pulse"></i></div>
        </div>
      </div>
    </div>

    <!-- Alerts -->
    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- Metrics Cards -->
    <div class="grid grid-cols-4 gap-4 animate-fade-in-up">
      <div class="bg-white border p-4 rounded-xl shadow-sm hover:border-teal-200 transition">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Company Vendors</div>
         <div class="text-2xl font-black text-slate-700">{{ summary.totalSuppliers || 0 }} Accounts</div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm hover:border-teal-200 transition">
         <div class="text-[10px] font-black uppercase tracking-widest text-teal-600 mb-1">B2B Portal Granted</div>
         <div class="text-2xl font-black text-teal-700">{{ summary.portalUsers || 0 }} Vendors</div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm hover:border-teal-200 transition">
         <div class="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">Adoption Rate</div>
         <div class="text-2xl font-black text-indigo-600">{{ Math.round((summary.portalUsers / summary.totalSuppliers) * 100) || 0 }}%</div>
      </div>
      <div class="bg-gradient-to-br from-slate-800 to-slate-900 border-none p-4 rounded-xl shadow-md text-white relative overflow-hidden">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Activity Telemetry</div>
         <div class="text-2xl font-black text-white">{{ summary.engagementLogs || 0 }} Actions</div>
         <i class="pi pi-wifi absolute -right-3 -bottom-3 text-5xl opacity-10"></i>
      </div>
    </div>

    <!-- Modern View Navigation -->
    <div class="flex gap-10 border-b border-slate-100 mb-6 shrink-0 bg-white p-4 px-8 rounded-2xl shadow-sm">
      <button :class="['pb-4 px-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group', activeTab === 'access' ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600']" @click="activeTab = 'access'">
        <i class="pi pi-shield mr-2"></i> Supplier Provisioning
        <div v-if="activeTab === 'access'" class="absolute bottom-0 left-0 w-full h-1 bg-teal-600 rounded-full shadow-[0_-4px_10px_rgba(13,148,136,0.3)]"></div>
      </button>
      <button :class="['pb-4 px-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group', activeTab === 'logs' ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600']" @click="activeTab = 'logs'; loadLogs()">
        <i class="pi pi-bolt mr-2"></i> Engagement Telemetry (Live)
        <div v-if="activeTab === 'logs'" class="absolute bottom-0 left-0 w-full h-1 bg-teal-600 rounded-full shadow-[0_-4px_10px_rgba(13,148,136,0.3)]"></div>
      </button>
    </div>

    <!-- TAB 1: Access Management Ledger (Premium Grid) -->
    <div v-if="activeTab === 'access'" class="animate-fade-in-up space-y-6">
       <!-- Controls Bar -->
       <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-wrap gap-4 items-center justify-between">
          <div class="flex items-center bg-slate-50 rounded-xl border border-slate-100 p-1 w-full md:w-96 shadow-inner">
            <i class="pi pi-search px-4 text-slate-300 text-xs"></i>
            <InputText v-model="q" placeholder="Cari Kode atau Nama Vendor..." class="border-none bg-transparent text-[11px] h-10 w-full font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" :disabled="!canRead" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-teal-600 transition-all shadow-sm bg-white" :disabled="!canRead" />
       </div>

       <!-- Provisioning Ledger -->
       <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up pb-20">
          <div class="overflow-x-auto custom-scrollbar">
            <table class="w-full text-sm">
              <thead class="bg-white text-left font-bold border-b border-slate-100">
                <tr>
                  <th class="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-1/3">Supplier Entity Detail</th>
                  <th class="px-6 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Authorized Portal Admins</th>
                  <th class="px-6 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center border-l border-slate-50 w-48">Activity Index</th>
                  <th class="px-6 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center border-l border-slate-50 w-40">Status Akses</th>
                  <th class="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right border-l border-slate-50 w-48">Management</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-if="loading">
                  <td colspan="5" class="py-24 text-center">
                    <i class="pi pi-spinner pi-spin text-4xl text-teal-500 opacity-20"></i>
                    <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-teal-600 uppercase">Pulling network directories...</div>
                  </td>
                </tr>
                
                <tr v-for="c in suppliers" v-else :key="c.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :style="{ borderLeftColor: getEdgeColor(c) }">
                  <td class="px-8 py-6 align-middle">
                    <div class="flex items-center gap-4">
                       <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs shadow-inner">
                          {{ c.name.charAt(0) }}
                       </div>
                       <div>
                          <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ c.code }}</p>
                          <div class="font-black text-slate-900 text-[13px] tracking-tight leading-none group-hover:text-teal-700 transition-colors uppercase">{{ c.name }}</div>
                          <div class="mt-1.5 flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                             <i class="pi pi-map-marker text-teal-400"></i> {{ c.city || 'National' }}
                             <span class="text-slate-200">|</span>
                             <span class="font-mono text-slate-400">{{ c.npwp || '-' }}</span>
                          </div>
                       </div>
                    </div>
                  </td>
                  
                  <td class="px-6 py-6 align-middle border-l border-slate-50 bg-slate-50/20 group-hover:bg-slate-100/30 transition-colors">
                     <div v-if="c.portalUsers && c.portalUsers.length > 0" class="flex flex-col gap-2">
                        <div v-for="pu in c.portalUsers" :key="pu.id" class="text-[10px] font-black text-teal-800 bg-teal-100/50 border border-teal-200 px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2 w-fit italic">
                           <i class="pi pi-at text-teal-400"></i> {{ pu.email }}
                        </div>
                     </div>
                     <div v-else class="text-[10px] font-black text-slate-300 uppercase tracking-widest italic flex items-center gap-2">
                        <i class="pi pi-ban text-slate-200"></i> No portal mapping
                     </div>
                  </td>

                  <td class="px-6 py-6 align-middle border-l border-slate-50 text-center">
                    <div class="flex flex-col gap-2 items-center">
                       <div class="flex items-center gap-3">
                          <span class="text-[10px] font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-xl shadow-sm border border-slate-100">📥 {{ c._count?.purchaseOrders || 0 }} PO</span>
                          <span class="text-[10px] font-black text-rose-700 bg-rose-50 px-3 py-1 rounded-xl shadow-sm border border-rose-100">📤 {{ c._count?.purchaseInvoices || 0 }} INV</span>
                       </div>
                    </div>
                  </td>

                  <td class="px-6 py-6 align-middle border-l border-slate-50 text-center relative overflow-hidden">
                    <span v-if="c.portalUsers?.length > 0" :class="getBadge(c.portalUsers[0].portalStatus)" class="w-32 py-1.5 shadow-sm">
                      {{ c.portalUsers[0].portalStatus }}
                    </span>
                    <span v-else class="text-[9px] font-black uppercase px-4 py-1.5 rounded-xl bg-slate-100 text-slate-400 border border-slate-200 w-32 inline-flex justify-center shadow-sm">UNREGISTERED</span>
                  </td>
                  
                  <td class="px-8 py-6 align-middle border-l border-slate-50 text-right">
                    <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                      <Button v-if="c.portalUsers?.length === 0" label="Provision Portal" size="small" class="h-10 text-[9px] font-black px-6 bg-slate-900 border-none text-teal-400 uppercase tracking-widest hover:bg-black rounded-xl shadow-xl" @click="openProvision(c)" />
                      <Button v-if="c.portalUsers?.length > 0 && c.portalUsers[0].portalStatus !== 'SUSPENDED'" icon="pi pi-ban" label="Block Access" size="small" class="h-10 text-[9px] font-black px-6 bg-rose-50 border-rose-100 text-rose-700 uppercase tracking-widest hover:bg-rose-100 rounded-xl" @click="revokeAccess(c.portalUsers[0].id)" />
                      <Button v-if="c.portalUsers?.length > 0 && c.portalUsers[0].portalStatus === 'SUSPENDED'" icon="pi pi-refresh" label="Restore Access" size="small" class="h-10 text-[9px] font-black px-6 bg-emerald-50 border-emerald-100 text-emerald-700 uppercase tracking-widest hover:bg-emerald-100 rounded-xl" @click="openProvision(c)" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
       </div>
    </div>

    <!-- TAB 2: Engagement Telemetry (High-Fidelity Feed) -->
    <div v-if="activeTab === 'logs'" class="animate-fade-in-up space-y-6">
       <div v-if="loadingLogs" class="py-32 text-center">
          <i class="pi pi-bolt pi-spin text-5xl text-teal-600 opacity-20"></i>
          <div class="mt-4 text-[10px] font-black uppercase text-teal-600 tracking-[0.2em]">Interpreting encrypted telemetry cycles...</div>
       </div>
       
       <div v-if="!loadingLogs && logs.length === 0" class="py-40 text-center border-4 border-dashed rounded-[3rem] bg-slate-50 text-slate-300">
           <i class="pi pi-wifi text-7xl mb-6 opacity-20"></i>
           <div class="text-[11px] font-black uppercase tracking-[0.3em]">No vendor network activity intercepted.</div>
       </div>

       <div v-else class="grid grid-cols-1 gap-4">
          <div v-for="lg in logs" :key="lg.id" class="bg-white border-2 border-slate-100 p-8 rounded-[2rem] shadow-sm flex items-start gap-8 hover:bg-slate-50 transition-all hover:-translate-y-1 group relative overflow-hidden">
              <div class="absolute right-0 top-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-teal-100/50 transition-all"></div>
              
              <div :class="['w-16 h-16 rounded-[1.2rem] flex items-center justify-center shrink-0 shadow-lg border-2 rotate-2 group-hover:rotate-0 transition-transform', getLogIcon(lg.activityType).bg]">
                  <i :class="['pi text-2xl', getLogIcon(lg.activityType).icon]"></i>
              </div>
              
              <div class="flex-1 space-y-2">
                 <div class="flex items-center gap-3">
                    <span class="text-[13px] font-black text-slate-900 uppercase tracking-tight">{{ lg.user?.supplier?.name }}</span>
                    <span class="text-slate-300">/</span>
                    <span class="text-[11px] font-black text-teal-600 italic tracking-tight">{{ lg.user?.email }}</span>
                 </div>
                 <div class="text-[13px] font-black text-slate-500 italic leading-relaxed">{{ lg.description }}</div>
                 
                 <div class="pt-2 flex flex-wrap gap-4">
                    <div class="px-4 py-1.5 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <i class="pi pi-clock text-[8px]"></i> {{ formatDateTime(lg.createdAt) }}
                    </div>
                    <div class="px-4 py-1.5 bg-slate-900 rounded-full text-[9px] font-black text-teal-400 uppercase tracking-widest flex items-center gap-2">
                       <i class="pi pi-tag text-[8px]"></i> ACT: {{ lg.activityType }}
                    </div>
                 </div>
              </div>
          </div>
       </div>
    </div>


    <!-- Dialog Provisioning Tool (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-slate-900">
        <!-- Dialog Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-teal-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-send text-3xl font-black"></i>
            </div>
            <div>
              <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Integrations <span class="text-teal-600 italic text-2xl">Dispatcher</span></h3>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-teal-500 text-teal-600">Secure B2B Portal Credential Provisioning</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-10 w-10" />
        </div>
        
        <!-- Dialog Body (Workspace) -->
        <div class="p-10 space-y-8 bg-slate-50/30 flex-1">
           <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm transition-all hover:border-teal-100 space-y-6">
              <div class="flex items-start gap-4">
                 <div class="w-8 h-8 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center shrink-0 shadow-lg italic font-black text-xs">!</div>
                 <div class="text-[12px] font-black text-slate-600 italic leading-relaxed">
                    Protokol otomatis mengirimkan set-up otentikasi kepada representasi <span class="text-teal-700 font-black">{{ targetSupplier?.name }}</span> untuk membuka akses portal B2B.
                 </div>
              </div>
              
              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Endpoint Alamat Email Vendor <span class="text-rose-500 ml-1 font-black">*</span></label>
                 <InputText type="email" v-model="inviteEmail" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-teal-400 transition-all font-mono tracking-widest" :placeholder="targetSupplier?.email || 'vendor@domain.com'" />
              </div>
           </div>
        </div>

        <!-- Dialog Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-end items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <Button label="Batal" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button label="Dispatch B2B Credentials" icon="pi pi-chevron-right" iconPos="right" :loading="saving" :disabled="!inviteEmail"
                @click="sendInvite" class="h-14 px-10 bg-slate-900 border-none text-teal-400 font-black text-[10px] uppercase shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all rounded-xl" />
          </div>
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

const canRead = auth.hasPermission('procurement.portal.read') || true;

const q = ref('');
const activeTab = ref('access');
const loading = ref(false);
const loadingLogs = ref(false);
const saving = ref(false);

const error = ref('');
const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const suppliers = ref<any[]>([]);
const logs = ref<any[]>([]);
const summary = ref<any>({});

const dialogOpen = ref(false);
const targetSupplier = ref<any>(null);
const inviteEmail = ref('');

function pad(n: number) { return String(n).padStart(2, '0'); }
function formatDateTime(iso: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${pad(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const getEdgeColor = (c: any) => {
   if (!c.portalUsers || c.portalUsers.length === 0) return '#cbd5e1'; // unregistered
   const st = c.portalUsers[0].portalStatus;
   if (st === 'ACTIVE') return '#0d9488'; // teal
   if (st === 'SUSPENDED') return '#e11d48'; // rose
   return '#f59e0b'; // PENDING amber
};

const getBadge = (st: string) => {
   if (st === 'ACTIVE') return 'text-[10px] font-black uppercase px-2 py-1 rounded bg-teal-50 text-teal-700 border border-teal-200';
   if (st === 'SUSPENDED') return 'text-[10px] font-black uppercase px-2 py-1 rounded bg-rose-100 text-rose-700 border border-rose-200';
   return 'text-[10px] font-black uppercase px-2 py-1 rounded bg-amber-100 text-amber-700 border border-amber-200';
};

const getLogIcon = (type: string) => {
   if (type === 'LOGIN') return { icon: 'pi-sign-in text-teal-600', bg: 'bg-teal-50 border-teal-200' };
   if (type === 'RFQ_BID_SUBMIT') return { icon: 'pi-wallet text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' };
   if (type === 'INVOICE_VIEW') return { icon: 'pi-receipt text-slate-600', bg: 'bg-slate-100 border-slate-200' };
   if (type === 'ADMIN_INVITE') return { icon: 'pi-send text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
   if (type === 'ADMIN_REVOKE') return { icon: 'pi-ban text-rose-600', bg: 'bg-rose-50 border-rose-200' };
   return { icon: 'pi-bars text-amber-600', bg: 'bg-amber-50 border-amber-200' };
};

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    const { data } = await api.get('/procurement/portal/vendors', { params });
    suppliers.value = data.data || [];
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
    const { data } = await api.get('/procurement/portal/activities');
    logs.value = data.data || [];
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loadingLogs.value = false;
  }
}

function openProvision(c: any) {
   targetSupplier.value = c;
   inviteEmail.value = c.email || '';
   dialogOpen.value = true;
}

async function sendInvite() {
   saving.value = true;
   try {
      await api.post('/procurement/portal/invite', { supplierCode: targetSupplier.value.code, email: inviteEmail.value });
      showMsg(success, 'Extranet Tautan otorisasi berhasil dikirim!');
      dialogOpen.value = false;
      load();
   } catch(e:any) {
      showMsg(error, e.response?.data?.message || e.message);
   } finally { saving.value = false; }
}

async function revokeAccess(portalUserId: string) {
   if (!confirm('Blokir hak akses Supplier ini secara permanen?')) return;
   try {
      await api.post('/procurement/portal/revoke', { portalUserId });
      showMsg(success, 'Hak akses Vendor telah diputus (Suspended).');
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
  from { opacity: 0; transform: scale(0.95); } 
  to { opacity: 1; transform: scale(1); } 
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
