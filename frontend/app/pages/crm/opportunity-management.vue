<template>
  <div class="space-y-6">
    <!-- Header (Premium Opportunity style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-emerald-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">CRM Management</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Opportunity Hub</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Opportunity <span class="text-emerald-600 italic">Management</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-xl">Kelola data master Deals (Peluang Penjualan), pantau nilai transaksi (Pipeline Value), dan atur kepemilikan agen.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Buat Deal Baru" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-lg shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" :disabled="loading || !canCreate" @click="openCreate" />
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

    <!-- KPI Stats Banners (Premium Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
       <!-- Pipeline Value Banner - High Contrast -->
      <div class="p-4 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between border border-slate-800 transition-all hover:bg-slate-950 group">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 opacity-80">Total Pipeline Value</div>
        <div class="flex items-end justify-between">
          <h3 class="text-2xl font-black text-white tracking-tighter font-mono">{{ fmtRp(totalPipelineValue) }}</h3>
          <div class="p-3 bg-slate-700 rounded-xl text-slate-100 shadow-lg">
            <i class="pi pi-chart-line text-lg"></i>
          </div>
        </div>
      </div>

      <!-- Proposal Banners -->
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-500 tracking-[0.2em] mb-4">Proposal Phase</div>
        <div class="flex items-end justify-between">
          <h3 class="text-4xl font-black text-amber-600 tracking-tighter">{{ countStage('PROPOSAL') }}</h3>
          <div class="p-3 bg-amber-50 text-amber-500 rounded-xl border border-amber-100"><i class="pi pi-file-edit text-lg"></i></div>
        </div>
      </div>
      
      <!-- Negotiation Banners -->
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em] mb-4">Negotiation</div>
        <div class="flex items-end justify-between">
          <h3 class="text-4xl font-black text-blue-600 tracking-tighter">{{ countStage('NEGOTIATION') }}</h3>
          <div class="p-3 bg-blue-50 text-blue-500 rounded-xl border border-blue-100"><i class="pi pi-comments text-lg"></i></div>
        </div>
      </div>
      
      <!-- Goal / Closed Won Banners -->
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em] mb-4">Deals Won / Goal</div>
        <div class="flex items-end justify-between">
          <h3 class="text-4xl font-black text-emerald-600 tracking-tighter">{{ countStage('CLOSED_WON') }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-500 rounded-xl border border-emerald-100"><i class="pi pi-trophy text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Controls (Standardized Premium Style) -->
    <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-wrap gap-4 items-center animate-fade-in-up">
      <div class="relative flex-1 max-w-sm">
        <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
        <InputText v-model="q" placeholder="Cari nama deal, kode, atau info klien..." class="w-full pl-10 h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white transition-all text-sm font-bold shadow-inner" @keyup.enter="load" />
      </div>
      <div class="flex items-center gap-2">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" class="h-12 w-12 border-slate-200 text-slate-500 hover:text-emerald-600 transition-all" />
      </div>
      <div class="ml-auto flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
         <i class="pi pi-info-circle text-emerald-500"></i>
         Tip: Gunakan menu <NuxtLink to="/crm/pipeline" class="text-emerald-600 hover:underline">Pipeline</NuxtLink> untuk Visual Drag & Drop.
      </div>
    </div>

    <!-- === TABLE VIEW (Premium Inventory Style) === -->
    <div class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50/80 text-left">
          <tr>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-48">Identifikasi Deal</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Relasi Klien</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-56 text-right">Value (Forecast)</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-52">Sales Owner</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-44 text-center">Pipeline Stage</th>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-32 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-if="loading">
            <td colspan="6" class="py-24 text-center">
              <i class="pi pi-spinner pi-spin text-4xl text-emerald-600 opacity-20"></i>
              <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Sinkronisasi Database Peluang...</div>
            </td>
          </tr>
          
          <tr v-for="o in filteredOpps" v-else :key="o.id" class="transition-all hover:bg-slate-50/50 group">
            <td class="px-8 py-6 align-middle">
              <div class="flex flex-col">
                <span class="font-mono text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 cursor-pointer hover:bg-emerald-100 inline-block w-fit transition-colors" @click="navigateTo(`/crm/opportunities/${o.id}`)">
                  {{ o.code }}
                </span>
                <div class="mt-2 font-black text-slate-900 text-[14px] tracking-tight leading-tight line-clamp-2" :title="o.name">{{ o.name?.toLowerCase() }}</div>
              </div>
            </td>
            
            <td class="px-6 py-6 align-middle">
              <div class="flex flex-col gap-2">
                 <div v-if="o.customer" class="flex items-center gap-1.5 text-[10px] font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md w-max border border-blue-100 uppercase tracking-wider">
                    <i class="pi pi-building text-[9px]"></i> {{ o.customer.name || o.customer.code }} (CLIENT)
                 </div>
                 <div v-else-if="o.lead" class="flex items-center gap-1.5 text-[10px] font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md w-max border border-amber-100 uppercase tracking-wider">
                    <i class="pi pi-user text-[9px]"></i> {{ o.lead.name || o.lead.code }} (LEAD)
                 </div>
                 <div v-else class="text-[9px] text-slate-400 font-black uppercase tracking-widest">Unlinked Account</div>
                 
                 <div class="text-[9px] font-black uppercase flex items-center gap-1.5" :class="isPast(o.closeDate) && o.stage !== 'CLOSED_WON' && o.stage !== 'CLOSED_LOST' ? 'text-rose-500' : 'text-slate-400'">
                   <i class="pi pi-calendar text-[10px]"></i> Est. Close: {{ o.closeDate ? formatDate(o.closeDate) : 'TBA' }}
                 </div>
              </div>
            </td>

            <td class="px-6 py-6 align-middle text-right">
              <div class="flex flex-col items-end">
                <div class="font-black font-mono text-[16px] text-slate-900 tracking-tighter">{{ fmtRp(o.expectedValue ?? 0) }}</div>
                <div class="text-[9px] font-black text-slate-300 uppercase tracking-widest">Expected Revenue</div>
              </div>
            </td>

            <td class="px-6 py-6 align-middle">
              <div class="relative h-10 group/select">
                 <select v-model="ownerSelection[o.id]"
                  class="w-full h-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-[11px] font-black uppercase tracking-tighter text-slate-600 appearance-none focus:border-emerald-500 focus:bg-white outline-none transition-all pr-8"
                  :disabled="!canAssign || !canReadUsers"
                  @change="assignOwner(o)">
                  <option value="">OPEN / NO OWNER</option>
                  <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name ?? u.email }}</option>
                </select>
                <i class="pi pi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none transition-transform group-hover/select:translate-y-[-40%]"></i>
              </div>
            </td>

            <td class="px-6 py-6 align-middle text-center">
              <div class="inline-block min-w-[140px]">
                <select v-model="stageSelection[o.id]"
                  class="w-full h-8 rounded-full border appearance-none px-3 text-center text-[10px] font-black uppercase tracking-[0.1em] focus:ring-2 outline-none transition-all cursor-pointer shadow-sm"
                  :disabled="!canUpdate"
                  :style="stageStyle(stageSelection[o.id])"
                  @change="updateStage(o)">
                  <option value="QUALIFICATION" class="bg-white text-slate-800">QUALIFICATION</option>
                  <option value="PROPOSAL" class="bg-white text-slate-800">PROPOSAL</option>
                  <option value="NEGOTIATION" class="bg-white text-slate-800">NEGOTIATION</option>
                  <option value="CLOSED_WON" class="bg-white text-slate-800 font-black">CLOSED WON / WIN</option>
                  <option value="CLOSED_LOST" class="bg-white text-slate-800">CLOSED LOST</option>
                </select>
              </div>
            </td>
            
            <td class="px-8 py-6 align-middle text-right">
              <div class="flex justify-end gap-2 opacity-0 lg:group-hover:opacity-100 transition-all duration-300 translate-x-4 lg:group-hover:translate-x-0">
                <Button icon="pi pi-pencil" v-tooltip.left="'Edit Details'" severity="secondary" text rounded class="h-10 w-10 text-slate-400 hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50" @click="openEdit(o)" />
                <Button icon="pi pi-external-link" v-tooltip.left="'Open Hub'" severity="secondary" text rounded class="h-10 w-10 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50" @click="navigateTo(`/crm/opportunities/${o.id}`)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredOpps.length === 0">
            <td colspan="6" class="py-32 text-center text-slate-400">
              <i class="pi pi-inbox text-5xl opacity-10 mb-4 block"></i>
              <div class="text-[10px] font-black uppercase tracking-[0.2em]">Peluang Kosong / Tidak Ditemukan</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Dialog (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white">
        <!-- Dialog Header -->
        <div class="p-10 border-b bg-white flex justify-between items-center relative overflow-hidden shrink-0">
          <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div class="relative flex items-center gap-5">
             <div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-xl rotate-3">
                <i class="pi pi-briefcase text-3xl" v-if="!editingId"></i>
                <i class="pi pi-pencil text-3xl" v-else></i>
             </div>
             <div>
                <h4 class="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">{{ editingId ? 'Update Detail' : 'Registrasi' }} <span class="text-emerald-600 italic">Deal</span></h4>
                <p class="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mt-2 px-1 border-l-2 border-emerald-500">Pipelines & Revenue Revenue Hub</p>
             </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="closeDialog" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body -->
        <div class="p-12 space-y-10 flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar">
          <!-- ID Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black shadow-lg">01</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Deal Identification (System Ref)</h4>
            </div>
            <div class="pl-11">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Reference Code</label>
              <input type="text" v-model="form.code" 
                class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-black font-mono text-emerald-600 outline-none focus:ring-2 focus:ring-emerald-100 disabled:opacity-60 transition-all uppercase" 
                :disabled="!!editingId" placeholder="Auto-generated..." />
            </div>
          </div>

          <!-- Basic Info -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-black shadow-lg">02</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-900">Contractual & Opportunity Profile</h4>
            </div>
            <div class="pl-11 space-y-8">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Deal Name / Contract Title <span class="text-rose-500">*</span></label>
                <input type="text" v-model="form.name" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-100 placeholder:italic" placeholder="e.g. Supply Agreement 2024 / Service Maintenance" />
              </div>
              
              <div class="grid grid-cols-2 gap-4 border-t border-b border-dashed border-slate-200 py-8">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-blue-500 uppercase tracking-widest block flex items-center gap-2"><i class="pi pi-building text-[10px]"></i> Bind to Customer</label>
                  <select v-model="form.customerId" class="w-full h-14 rounded-2xl border-none bg-blue-50/50 shadow-inner px-4 text-xs font-black text-blue-900 outline-none focus:ring-2 focus:ring-blue-100 appearance-none cursor-pointer">
                     <option value="">- Unlinked Account -</option>
                     <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name || c.code }}</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-amber-500 uppercase tracking-widest block flex items-center gap-2"><i class="pi pi-user text-[10px]"></i> Bind to Sales Lead</label>
                  <select v-model="form.leadId" class="w-full h-14 rounded-2xl border-none bg-amber-50/50 shadow-inner px-4 text-xs font-black text-amber-900 outline-none focus:ring-2 focus:ring-amber-100 appearance-none cursor-pointer">
                     <option value="">- Unlinked Prospect -</option>
                     <option v-for="l in leads" :key="l.id" :value="l.id">{{ l.name || l.code }}</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Expected Deal Value (Rp)</label>
                  <input type="number" v-model="form.expectedValue" class="w-full h-14 rounded-2xl border-none bg-emerald-50/30 shadow-inner px-6 text-sm font-black text-emerald-700 focus:ring-2 focus:ring-emerald-100 placeholder:text-emerald-200" placeholder="0.00" />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Est. Target Closing Date</label>
                  <input type="date" v-model="form.closeDate" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-100 transition-all outline-none" />
                </div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-[10px] font-black shadow-sm">03</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Sales Internal Justification</h4>
            </div>
            <div class="pl-11">
              <textarea v-model="form.notes" rows="3" class="w-full rounded-2xl border-none bg-white shadow-inner p-4 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-emerald-100 resize-none placeholder:italic" placeholder="Internal notes, next actions, or decision makers..."></textarea>
            </div>
          </div>

          <div v-if="dialogError" class="ml-11 rounded-2xl bg-rose-50 px-5 py-4 text-[11px] text-rose-600 border border-rose-100 font-black uppercase tracking-widest shadow-sm">
            <i class="pi pi-exclamation-circle mr-2"></i> {{ dialogError }}
          </div>
        </div>
        
        <!-- Dialog Footer -->
        <div class="p-10 border-t bg-white flex justify-end items-center gap-4 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <Button label="Batal & Tutup" severity="secondary" text @click="closeDialog" class="px-8 h-14 font-black text-[10px] uppercase tracking-widest" :disabled="saving" />
          <Button :label="editingId ? 'Sinkronisasi Deal' : 'Terbitkan Deal Baru'" :loading="saving" :disabled="!form.name || !form.expectedValue"
            @click="save" class="p-button-rounded h-14 px-12 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-check-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

type Opportunity = {
  id: string; code: string; name: string;
  stage: 'QUALIFICATION' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST';
  expectedValue?: string | null; closeDate?: string | null;
  lead?: { id: string; code: string; name: string } | null;
  customer?: { id: string; code: string; name: string } | null;
  owner?: { id: string; email: string; name: string | null } | null;
};
type Lead = { id: string; code: string; name: string };
type Customer = { id: string; code: string; name: string };
type CrmUser = { id: string; email: string; name: string | null };

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('crm.opportunity.read'));
const canCreate = computed(() => auth.hasPermission('crm.opportunity.create'));
const canUpdate = computed(() => auth.hasPermission('crm.opportunity.update'));
const canAssign = computed(() => auth.hasPermission('crm.opportunity.assign'));
const canReadUsers = computed(() => auth.hasPermission('crm.user.read'));
const canReadLead = computed(() => auth.hasPermission('crm.lead.read'));
const canReadCustomer = computed(() => auth.hasPermission('crm.customer.read'));

const q = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const opportunities = ref<Opportunity[]>([]);
const filteredOpps = computed(() => {
  if (!q.value) return opportunities.value;
  const s = q.value.toLowerCase();
  return opportunities.value.filter(o => o.name.toLowerCase().includes(s) || o.code.toLowerCase().includes(s) || 
                                         (o.customer?.name||'').toLowerCase().includes(s) || (o.lead?.name||'').toLowerCase().includes(s));
});

const totalPipelineValue = computed(() => opportunities.value.filter(o => o.stage !== 'CLOSED_LOST').reduce((s,o) => s + Number(o.expectedValue ?? 0), 0));

const countStage = (s: string) => opportunities.value.filter(o => o.stage === s).length;

const stageSelection = reactive<Record<string, Opportunity['stage']>>({});
const ownerSelection = reactive<Record<string, string>>({});
const leads = ref<Lead[]>([]);
const customers = ref<Customer[]>([]);
const users = ref<CrmUser[]>([]);

const dialogOpen = ref(false);
const saving = ref(false);
const dialogError = ref<string | null>(null);
const editingId = ref<string | null>(null);

const form = reactive({ code: '', name: '', leadId: '', customerId: '', expectedValue: '', closeDate: '', notes: '' });

const fmtRp = (v: any) => {
   const val = Number(v);
   if (val === 0) return '-';
   return `Rp ${val.toLocaleString('id-ID')}`;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
};

const isPast = (iso?: string | null) => iso ? new Date(iso) < new Date() : false;

const stageStyle = (st: string) => {
  if (st === 'QUALIFICATION') return { backgroundColor: '#ede9fe', color: '#8b5cf6', borderColor: '#c4b5fd' }; // purple
  if (st === 'PROPOSAL') return { backgroundColor: '#fef3c7', color: '#f59e0b', borderColor: '#fde68a' }; // amber
  if (st === 'NEGOTIATION') return { backgroundColor: '#e0f2fe', color: '#3b82f6', borderColor: '#bae6fd' }; // blue
  if (st === 'CLOSED_WON') return { backgroundColor: '#d1fae5', color: '#10b981', borderColor: '#a7f3d0' }; // emerald
  return { backgroundColor: '#ffe4e6', color: '#f43f5e', borderColor: '#fecdd3' }; // rose
};
const stageColor = (st: string) => {
  if (st === 'QUALIFICATION') return '#8b5cf6';
  if (st === 'PROPOSAL') return '#f59e0b';
  if (st === 'NEGOTIATION') return '#3b82f6';
  if (st === 'CLOSED_WON') return '#10b981';
  return '#f43f5e';
};

const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const load = async () => {
  loading.value = true; error.value = null; success.value = null;
  try {
    const tasks: Promise<any>[] = [];
    tasks.push(canRead.value ? api.get('/crm/opportunities') : Promise.resolve({ data: { opportunities: [] } }));
    tasks.push(canReadLead.value && leads.value.length === 0 ? api.get('/crm/leads') : Promise.resolve({ data: { leads: leads.value } }));
    tasks.push(canReadCustomer.value && customers.value.length === 0 ? api.get('/crm/customers') : Promise.resolve({ data: { customers: customers.value } }));
    tasks.push(canReadUsers.value && users.value.length === 0 ? api.get('/crm/users') : Promise.resolve({ data: { users: users.value } }));
    
    const [oRes, lRes, cRes, uRes] = await Promise.all(tasks);
    opportunities.value = oRes.data?.opportunities ?? oRes.opportunities ?? [];
    
    if (lRes.data?.leads) leads.value = lRes.data.leads;
    else if (lRes.leads) leads.value = lRes.leads;

    if (cRes.data?.customers) customers.value = cRes.data.customers;
    else if (cRes.customers) customers.value = cRes.customers;

    if (uRes.data?.users) users.value = uRes.data.users;
    else if (uRes.users) users.value = uRes.users;

    for (const o of opportunities.value) {
      stageSelection[o.id] = o.stage;
      ownerSelection[o.id] = o.owner?.id ?? '';
    }
  } catch (e: any) { error.value = e?.response?.data?.message ?? 'Gagal load master deals'; } 
  finally { loading.value = false; }
};

const openCreate = () => {
  editingId.value = null;
  form.code = `OPP-${Math.floor(Math.random()*90000)+10000}`;
  form.name = ''; form.leadId = ''; form.customerId = '';
  form.expectedValue = ''; form.closeDate = ''; form.notes = '';
  dialogError.value = null; dialogOpen.value = true;
};

const openEdit = (o: Opportunity) => {
  editingId.value = o.id; form.code = o.code; form.name = o.name;
  form.leadId = o.lead?.id ?? ''; form.customerId = o.customer?.id ?? '';
  form.expectedValue = o.expectedValue ?? '';
  form.closeDate = o.closeDate ? o.closeDate.slice(0,10) : '';
  dialogError.value = null; dialogOpen.value = true;
};

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };

const save = async () => {
  saving.value = true; dialogError.value = null;
  try {
    const payload = {
      name: form.name, expectedValue: form.expectedValue || undefined,
      leadId: form.leadId || undefined, customerId: form.customerId || undefined,
      closeDate: form.closeDate ? new Date(form.closeDate).toISOString() : undefined,
      notes: form.notes || undefined,
    };
    if (editingId.value) {
      await api.patch(`/crm/opportunities/${editingId.value}`, payload);
      showMsg(success, `Deal ${form.name} diperbarui!`);
    } else {
      await api.post('/crm/opportunities', { code: form.code, ...payload });
      showMsg(success, `Sukses membuat deal ${form.name}!`);
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) { dialogError.value = e?.response?.data?.message ?? 'Gagal simpan deals'; } 
  finally { saving.value = false; }
};

const updateStage = async (o: Opportunity) => {
  const oldStage = o.stage;
  try {
    await api.patch(`/crm/opportunities/${o.id}`, { stage: stageSelection[o.id] });
    showMsg(success, `Transaksi merubah stage ke ${stageSelection[o.id]}`);
    o.stage = stageSelection[o.id];
  } catch (e: any) {
    stageSelection[o.id] = oldStage;
    showMsg(error, e?.response?.data?.message ?? 'Gagal mengubah stage');
  }
};

const assignOwner = async (o: Opportunity) => {
  try {
    await api.patch(`/crm/opportunities/${o.id}/assign`, { userId: ownerSelection[o.id] || undefined });
    showMsg(success, 'Assignee / P.I.C sukses dialokasi ulang.');
  } catch (e: any) {
    ownerSelection[o.id] = o.owner?.id ?? '';
    showMsg(error, e?.response?.data?.message ?? 'Gagal assign PIC');
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
