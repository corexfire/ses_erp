<template>
  <div class="space-y-6">
    <!-- Header Admin Dashboard -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-teal-600 relative overflow-hidden">
      <div class="absolute right-[0px] top-[-30px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-box text-[190px] text-teal-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-building text-teal-600"></i> B2B Vendor Portal Administration
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium max-w-2xl">
            Pusat manajemen hak akses Ekstranet e-Procurement untuk Pemasok/Vendor (*Portal Provisioning*) dan pemantauan interaksi mereka (RFQ Bids, Invoices).
          </div>
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

    <!-- Toggle View Nav -->
    <div class="flex gap-4 border-b border-slate-200">
      <button :class="['pb-2 px-1 text-sm font-black transition', activeTab === 'access' ? 'border-b-2 border-teal-600 text-teal-700' : 'text-slate-500 hover:text-slate-700']" @click="activeTab = 'access'">🔐 Supplier Provisioning</button>
      <button :class="['pb-2 px-1 text-sm font-black transition', activeTab === 'logs' ? 'border-b-2 border-teal-600 text-teal-700' : 'text-slate-500 hover:text-slate-700']" @click="activeTab = 'logs'; loadLogs()">📡 Engagement Telemetry (Live)</button>
    </div>

    <!-- TAB 1: Access Management Grid -->
    <div v-if="activeTab === 'access'" class="space-y-4 animate-fade-in-up">
       <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
         <span class="p-input-icon-left w-72">
            <i class="pi pi-search" />
            <InputText v-model="q" placeholder="Cari Kode/Nama Vendor..." class="w-full text-sm h-10" @keyup.enter="load" :disabled="!canRead" />
         </span>
         <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0" :disabled="!canRead" />
       </div>

       <div class="bg-white border rounded-xl overflow-hidden shadow-sm">
         <table class="w-full text-sm">
           <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
             <tr>
               <th class="px-5 py-3 border-b">Supplier Entity Name</th>
               <th class="px-4 py-3 border-l border-b">Vendor Extranet Admins</th>
               <th class="px-4 py-3 border-l border-b text-center">Docs Status</th>
               <th class="px-4 py-3 border-l border-b text-center">Access State</th>
               <th class="px-4 py-3 border-l border-b text-center w-36">Management</th>
             </tr>
           </thead>
           <tbody class="divide-y divide-slate-100">
             <tr v-if="loading">
               <td colspan="5" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-teal-500 shadow-sm"></i> Pulling network directories...</td>
             </tr>
             <tr v-for="c in suppliers" v-else :key="c.id" class="transition hover:bg-slate-50 group border-l-4" :style="{ borderLeftColor: getEdgeColor(c) }">
               <td class="px-5 py-3 align-top">
                 <div class="font-bold text-slate-800 text-sm">{{ c.code }} | {{ c.name }}</div>
                 <div class="mt-1 flex items-center gap-1.5 text-[10px] text-slate-500">
                   📍 {{ c.city || 'No City' }}, NPWP: {{ c.npwp || '-' }}
                 </div>
               </td>
               
               <td class="px-4 py-3 align-top border-l bg-slate-50/50">
                  <div v-if="c.portalUsers && c.portalUsers.length > 0" class="flex flex-col gap-1.5">
                     <div v-for="pu in c.portalUsers" :key="pu.id" class="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded flex items-center gap-1.5 pb-1">
                        <i class="pi pi-at text-[9px]"></i> {{ pu.email }}
                     </div>
                  </div>
                  <div v-else class="text-[11px] font-medium text-slate-400 italic mt-1">Vendor has no portal mapping.</div>
               </td>

               <td class="px-4 py-3 align-top border-l text-center">
                 <div class="flex flex-col gap-1 items-center justify-center h-full">
                     <div class="text-[9px] font-bold text-slate-500">📥 {{ c._count?.purchaseOrders || 0 }} POs Recv</div>
                     <div class="text-[9px] font-bold text-rose-500">📤 {{ c._count?.purchaseInvoices || 0 }} Inv Issued</div>
                 </div>
               </td>

               <td class="px-4 py-3 align-top border-l text-center">
                 <span v-if="c.portalUsers?.length > 0" :class="getBadge(c.portalUsers[0].portalStatus)">
                   {{ c.portalUsers[0].portalStatus }}
                 </span>
                 <span v-else class="text-[10px] font-black uppercase px-2 py-1 rounded bg-slate-100 text-slate-400 border">UNREGISTERED</span>
               </td>
               
               <td class="px-4 py-3 align-top border-l text-center">
                 <div class="flex justify-center gap-1.5 mt-1">
                   <Button v-if="c.portalUsers?.length === 0" icon="pi pi-send" label="Provision" size="small" class="h-7 text-[10px] px-2 text-white bg-slate-800 border-none hover:bg-black" @click="openProvision(c)" />
                   <Button v-if="c.portalUsers?.length > 0 && c.portalUsers[0].portalStatus !== 'SUSPENDED'" icon="pi pi-ban" label="Block" size="small" class="h-7 text-[10px] px-2 text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100" @click="revokeAccess(c.portalUsers[0].id)" />
                   <Button v-if="c.portalUsers?.length > 0 && c.portalUsers[0].portalStatus === 'SUSPENDED'" icon="pi pi-refresh" label="Restore" size="small" class="h-7 text-[10px] px-2 text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100" @click="openProvision(c)" />
                 </div>
               </td>
             </tr>
             <tr v-if="!loading && suppliers.length === 0">
               <td colspan="5" class="py-12 text-center text-slate-400 italic text-sm font-medium">Buku Supplier kosong.</td>
             </tr>
           </tbody>
         </table>
       </div>
    </div>

    <!-- TAB 2: Feed / Logs -->
    <div v-if="activeTab === 'logs'" class="space-y-4 animate-fade-in-up">
       <div v-if="loadingLogs" class="py-10 text-center"><i class="pi pi-spinner pi-spin text-2xl text-teal-600"></i></div>
       
       <div v-if="!loadingLogs && logs.length === 0" class="py-20 text-center border-2 border-dashed rounded-xl bg-slate-50 text-slate-400">
           <i class="pi pi-server text-4xl mb-3"></i>
           <div>No vendor telemetry data intercepted.</div>
       </div>

       <div v-else class="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div v-for="lg in logs" :key="lg.id" class="p-4 border-b border-slate-100 flex items-start gap-4 hover:bg-slate-50 transition">
              <div :class="['w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm border', getLogIcon(lg.activityType).bg]">
                  <i :class="['pi text-lg', getLogIcon(lg.activityType).icon]"></i>
              </div>
              <div class="flex-1">
                 <div class="text-sm font-medium text-slate-800 leading-tight">
                    <span class="font-black">{{ lg.user?.supplier?.name }}</span> via <span class="text-teal-700 font-bold">{{ lg.user?.email }}</span>
                 </div>
                 <div class="text-xs text-slate-600 mt-1">{{ lg.description }}</div>
                 <div class="mt-1.5 flex gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span><i class="pi pi-clock text-[9px]"></i> {{ formatDateTime(lg.createdAt) }}</span>
                    <span>ACT: {{ lg.activityType }}</span>
                 </div>
              </div>
          </div>
       </div>
    </div>


    <!-- Dialog Setup Provisioning -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" @click.self="dialogOpen = false">
      <div class="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden animate-fade-in-up border-2 border-white">
        <div class="p-5 border-b flex justify-between items-center bg-gradient-to-r from-teal-800 to-slate-900 text-white">
          <div class="text-sm font-black uppercase tracking-widest flex items-center gap-2"><i class="pi pi-send"></i> Issue Portal Invite</div>
          <button class="text-white hover:text-teal-200" @click="dialogOpen = false">✕</button>
        </div>
        <div class="p-5 space-y-4">
           <div class="text-sm text-slate-600 leading-relaxed font-medium">
              Protokol e-Procurement otomatis mengirimkan Security Auth Setup kepada representasi Vendor: <span class="font-black text-slate-800">{{ targetSupplier?.name }}</span>.
           </div>
           
           <div class="space-y-1.5">
             <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vendor Email Endpoint</label>
             <input type="email" v-model="inviteEmail" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-teal-500 shadow-inner" :placeholder="targetSupplier?.email || 'vendor@domain.com'" />
           </div>
        </div>
        <div class="p-4 bg-slate-50 border-t flex justify-end gap-2">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="dialogOpen = false" class="bg-white" />
          <Button label="Dispatch B2B Credentials" :loading="saving" :disabled="!inviteEmail"
            @click="sendInvite" class="bg-teal-700 border-teal-800 text-white font-bold hover:bg-teal-800" icon="pi pi-chevron-right" iconPos="right" />
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
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>
