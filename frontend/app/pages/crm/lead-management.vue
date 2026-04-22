<template>
  <div class="space-y-6">
    <!-- Header (Premium CRM Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-blue-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">CRM Management</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-blue-600">Lead Database</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Lead <span class="text-blue-600 italic">Management</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-xl">Kelola prospek dari masuk (NEW) sampai ter-kualifikasi (QUALIFIED) dan akhirnya dikonversi menjadi Pelanggan Resmi.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Buat Lead Baru" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-blue-600 border-none text-white font-black text-[10px] uppercase shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all" :disabled="loading || !canCreate" @click="openCreate" />
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

    <!-- KPI Overview Banners (Premium Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 animate-fade-in-up">
      <!-- Total Leads -->
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Total Active Leads</div>
        <div class="flex items-end justify-between">
          <h3 class="text-4xl font-black text-slate-900 tracking-tighter">{{ leads.filter(l => l.status !== 'WON' && l.status !== 'LOST').length }}</h3>
          <div class="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100"><i class="pi pi-users text-lg"></i></div>
        </div>
      </div>
      
      <!-- New Leads -->
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-sky-500 tracking-[0.2em] mb-4">New / Baru</div>
        <div class="flex items-end justify-between">
          <h3 class="text-4xl font-black text-sky-600 tracking-tighter">{{ countStatus('NEW') }}</h3>
          <div class="p-3 bg-sky-50 text-sky-500 rounded-xl border border-sky-100"><i class="pi pi-user-plus text-lg"></i></div>
        </div>
      </div>
      
      <!-- Contacted -->
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-500 tracking-[0.2em] mb-4">Contacted</div>
        <div class="flex items-end justify-between">
          <h3 class="text-4xl font-black text-amber-600 tracking-tighter">{{ countStatus('CONTACTED') }}</h3>
          <div class="p-3 bg-amber-50 text-amber-500 rounded-xl border border-amber-100"><i class="pi pi-phone text-lg"></i></div>
        </div>
      </div>
      
      <!-- Qualified -->
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em] mb-4">Qualified</div>
        <div class="flex items-end justify-between">
          <h3 class="text-4xl font-black text-emerald-600 tracking-tighter">{{ countStatus('QUALIFIED') }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-500 rounded-xl border border-emerald-100"><i class="pi pi-star text-lg"></i></div>
        </div>
      </div>
      
      <!-- Converted (WON) Banner - High Contrast -->
      <div class="p-4 rounded-2xl bg-indigo-900 text-white shadow-xl flex flex-col justify-between border border-indigo-800 transition-all hover:bg-indigo-950 group">
        <div class="text-[10px] font-black uppercase text-indigo-300 tracking-[0.2em] mb-4 opacity-80">Conversion Success</div>
        <div class="flex items-end justify-between">
          <h3 class="text-4xl font-black text-white tracking-tighter font-mono">{{ countStatus('WON') }} <span class="text-xs uppercase font-sans text-indigo-400">Won</span></h3>
          <div class="p-3 bg-indigo-600 rounded-xl text-indigo-100 shadow-lg animate-pulse">
            <i class="pi pi-trophy text-lg"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls (Standardized Premium Style) -->
    <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-wrap gap-4 items-center animate-fade-in-up">
      <div class="flex gap-1.5 bg-slate-50 border border-slate-100 rounded-2xl p-1.5">
        <button v-for="s in ['SEMUA','NEW','CONTACTED','QUALIFIED','WON','LOST']" :key="s"
          @click="statusFilter = s === 'SEMUA' ? '' : s"
          :class="(statusFilter || 'SEMUA') === s ? 'bg-indigo-900 text-white shadow-lg' : 'text-slate-500 hover:bg-white hover:text-indigo-600'"
          class="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300">
          {{ s }}
        </button>
      </div>
      <div class="w-px h-8 bg-slate-100 mx-2 hidden lg:block"></div>
      <div class="relative flex-1 max-w-sm">
        <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
        <InputText v-model="q" placeholder="Cari nama, kode, email..." class="w-full pl-10 h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white transition-all text-sm font-bold shadow-inner" @keyup.enter="load" />
      </div>
      <div class="flex items-center gap-2 ml-auto">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" class="h-12 w-12 border-slate-200 text-slate-500 hover:text-blue-600 transition-all" />
      </div>
    </div>

    <!-- === TABLE VIEW (Premium Inventory Style) === -->
    <div class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50/80 text-left">
          <tr>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-40">Identifikasi</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profil Prospek</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kontak & Komunikasi</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-56">Penugasan (Assignee)</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-44 text-center">Pipeline Stage</th>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-40 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-if="loading">
            <td colspan="6" class="py-24 text-center">
              <i class="pi pi-spinner pi-spin text-4xl text-blue-600 opacity-20"></i>
              <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Sinkronisasi Prospek...</div>
            </td>
          </tr>
          
          <tr v-for="l in filteredLeads" v-else :key="l.id" class="transition-all hover:bg-slate-50/50 group">
            <td class="px-8 py-6 align-middle">
              <div class="flex flex-col">
                <span class="font-mono text-[11px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-100 inline-block w-fit transition-colors" @click="openEdit(l)">
                  {{ l.code }}
                </span>
                <span class="mt-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ formatDateSafe(l.createdAt) }}</span>
              </div>
            </td>
            
            <td class="px-6 py-6 align-middle">
              <div class="flex items-center gap-4">
                <div class="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-[11px] text-white shrink-0 shadow-lg"
                  :style="{ backgroundColor: avatarColor(l.name ?? 'A') }">
                  {{ initials(l.name) }}
                </div>
                <div class="min-w-0">
                  <div class="font-black text-slate-900 text-[15px] tracking-tight truncate leading-none mb-1.5 capitalize">{{ l.name?.toLowerCase() }}</div>
                  <div class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-md">
                    <i class="pi pi-tag text-[8px] text-slate-400"></i>
                    <span class="text-[9px] font-black uppercase text-slate-500 tracking-wider">{{ l.source || 'Standard Entry' }}</span>
                  </div>
                </div>
              </div>
            </td>
            
            <td class="px-6 py-6 align-middle">
              <div class="flex flex-col gap-1.5">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <i class="pi pi-envelope text-[10px] text-blue-400"></i>
                  <span class="truncate max-w-[180px]">{{ l.email || '-' }}</span>
                </div>
                <div class="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <i class="pi pi-phone text-[10px] text-amber-400"></i>
                  <span>{{ l.phone || '-' }}</span>
                </div>
              </div>
            </td>
            
            <td class="px-6 py-6 align-middle">
              <div class="relative h-10 group/select">
                 <select v-model="assigneeSelection[l.id]"
                  class="w-full h-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-[11px] font-black uppercase tracking-tighter text-slate-600 appearance-none focus:border-blue-500 focus:bg-white outline-none transition-all pr-8"
                  :disabled="!canAssign || !canReadUsers || converting === l.id"
                  @change="assign(l)">
                  <option value="">OPEN / UNASSIGNED</option>
                  <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name ?? u.email }}</option>
                </select>
                <i class="pi pi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none transition-transform group-hover/select:translate-y-[-40%]"></i>
              </div>
            </td>

            <td class="px-6 py-6 align-middle text-center">
              <div class="inline-block min-w-[120px]">
                <select v-model="statusSelection[l.id]"
                  class="w-full h-8 rounded-full border appearance-none px-3 text-center text-[10px] font-black uppercase tracking-[0.1em] focus:ring-2 outline-none transition-all cursor-pointer"
                  :disabled="!canUpdate || l.status === 'WON' || converting === l.id"
                  :style="{ backgroundColor: statusBg(statusSelection[l.id]), color: statusColor(statusSelection[l.id]), borderColor: statusColor(statusSelection[l.id]) + '44' }"
                  @change="updateStatus(l)">
                  <option value="NEW" class="bg-white text-slate-800">NEW</option>
                  <option value="CONTACTED" class="bg-white text-slate-800">CONTACTED</option>
                  <option value="QUALIFIED" class="bg-white text-slate-800">QUALIFIED</option>
                  <option value="LOST" class="bg-white text-slate-800">LOST</option>
                  <option value="WON" class="bg-white text-slate-800" disabled>WON (CONVERTED)</option>
                </select>
              </div>
            </td>
            
            <td class="px-8 py-6 align-middle text-right">
              <div v-if="l.status !== 'WON'" class="flex justify-end gap-2 opacity-0 lg:group-hover:opacity-100 transition-all duration-300 translate-x-4 lg:group-hover:translate-x-0">
                <Button icon="pi pi-pencil" v-tooltip.left="'Edit Profile'" severity="secondary" text rounded class="h-10 w-10 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50" @click="openEdit(l)" />
                <Button v-if="canConvert" label="Convert" icon="pi pi-bolt" 
                  class="h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none shadow-lg shadow-blue-100 active:scale-95 transition-all" 
                  :loading="converting === l.id" @click="convert(l)" />
              </div>
              <div v-else class="flex justify-end">
                 <div class="px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                   <i class="pi pi-check text-[8px]"></i> Account Won
                 </div>
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredLeads.length === 0">
            <td colspan="6" class="py-32 text-center text-slate-400">
              <i class="pi pi-inbox text-5xl opacity-10 mb-4 block"></i>
              <div class="text-[10px] font-black uppercase tracking-[0.2em]">Data Tidak Ditemukan</div>
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
          <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div class="relative flex items-center gap-5">
             <div class="w-16 h-16 rounded-[1.5rem] bg-blue-900 flex items-center justify-center text-white shadow-xl rotate-3">
                <i class="pi pi-user-plus text-3xl" v-if="!editingId"></i>
                <i class="pi pi-user-edit text-3xl" v-else></i>
             </div>
             <div>
                <h4 class="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">{{ editingId ? 'Update Detail' : 'Registrasi' }} <span class="text-blue-600 italic">Lead</span></h4>
                <p class="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mt-2 px-1 border-l-2 border-blue-500">Relationship Lifecycle Management</p>
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
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Identitas Record (System ID)</h4>
            </div>
            <div class="pl-11">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Kode Referensi Otomatis</label>
              <input type="text" v-model="form.code" 
                class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-black font-mono text-blue-600 outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-60" 
                :disabled="!!editingId" placeholder="Auto-generated..." />
            </div>
          </div>

          <!-- Basic Info -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-black shadow-lg">02</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-blue-900">Informasi Prospek Penting</h4>
            </div>
            <div class="pl-11 space-y-8">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Nama Lengkap / Instansi Prospek <span class="text-rose-500">*</span></label>
                <input type="text" v-model="form.name" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-100 placeholder:italic" placeholder="Contoh: PT. Abadi Jaya / Budi Santoso" />
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Email Address</label>
                  <input type="email" v-model="form.email" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-300" placeholder="mail@example.com" />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Phone / WhatsApp</label>
                  <input type="text" v-model="form.phone" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-300" placeholder="0812..." />
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Sumber Prospek (Lead Source)</label>
                <input type="text" v-model="form.source" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-300" placeholder="Website, LinkedIn, Referral, etc." />
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-[10px] font-black shadow-sm">03</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Justifikasi & Audit Notes</h4>
            </div>
            <div class="pl-11">
              <textarea v-model="form.notes" rows="4" class="w-full rounded-2xl border-none bg-white shadow-inner p-4 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-blue-100 resize-none placeholder:italic" placeholder="Tambahkan deskripsi kebutuhan prospek atau latar belakang interaksi..."></textarea>
            </div>
          </div>

          <div v-if="dialogError" class="ml-11 rounded-2xl bg-rose-50 px-5 py-4 text-[11px] text-rose-600 border border-rose-100 font-black uppercase tracking-widest shadow-sm">
            <i class="pi pi-exclamation-circle mr-2"></i> {{ dialogError }}
          </div>
        </div>
        
        <!-- Dialog Footer -->
        <div class="p-10 border-t bg-white flex justify-end items-center gap-4 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <Button label="Batal & Tutup" severity="secondary" text @click="closeDialog" class="px-8 h-14 font-black text-[10px] uppercase tracking-widest" :disabled="saving" />
          <Button :label="editingId ? 'Sinkronisasi Data' : 'Terbitkan Lead Baru'" :loading="saving" :disabled="!form.name"
            @click="save" class="p-button-rounded h-14 px-12 bg-blue-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-check-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

type Lead = {
  id: string; code: string; name: string; email?: string | null; phone?: string | null;
  source?: string | null; notes?: string | null;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'LOST' | 'WON';
  assignedTo?: { id: string; email: string; name: string | null } | null;
  createdAt?: string;
};
type CrmUser = { id: string; email: string; name: string | null };

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('crm.lead.read'));
const canCreate = computed(() => auth.hasPermission('crm.lead.create'));
const canUpdate = computed(() => auth.hasPermission('crm.lead.update'));
const canConvert = computed(() => auth.hasPermission('crm.lead.convert'));
const canAssign = computed(() => auth.hasPermission('crm.lead.assign'));
const canReadUsers = computed(() => auth.hasPermission('crm.user.read'));

const q = ref('');
const statusFilter = ref('');
const loading = ref(false);
const converting = ref<string | null>(null);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const leads = ref<Lead[]>([]);
const filteredLeads = computed(() => {
  let res = leads.value;
  if (statusFilter.value) res = res.filter(l => l.status === statusFilter.value);
  if (q.value) {
    const s = q.value.toLowerCase();
    res = res.filter(l => l.name.toLowerCase().includes(s) || l.code.toLowerCase().includes(s) || (l.email && l.email.toLowerCase().includes(s)));
  }
  return res;
});

const statusSelection = reactive<Record<string, Lead['status']>>({});
const assigneeSelection = reactive<Record<string, string>>({});
const users = ref<CrmUser[]>([]);

const dialogOpen = ref(false);
const saving = ref(false);
const dialogError = ref<string | null>(null);
const editingId = ref<string | null>(null);

const form = reactive({ code: '', name: '', email: '', phone: '', source: '', notes: '' });

// AVATAR & TYPOGRAPHY LOGIC
const AVATAR_COLORS = ['#3b82f6','#8b5cf6','#ec4899','#f97316','#10b981','#06b6d4','#f59e0b'];
const avatarColor = (n: string) => AVATAR_COLORS[(n?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
const initials = (n?: string) => {
  if (!n) return 'U';
  const p = n.trim().split(' ');
  return p.length > 1 ? (p[0][0] + p[1][0]).toUpperCase() : p[0].substring(0, 2).toUpperCase();
};
const formatDateSafe = (iso?: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear().toString().slice(2)}`;
};

const statusColor = (st: string) => {
  if (st === 'NEW') return '#0ea5e9'; // sky
  if (st === 'CONTACTED') return '#f59e0b'; // amber
  if (st === 'QUALIFIED') return '#10b981'; // emerald
  if (st === 'WON') return '#8b5cf6'; // purple
  return '#ef4444'; // rose (LOST)
};
const statusBg = (st: string) => {
  if (st === 'NEW') return '#e0f2fe';
  if (st === 'CONTACTED') return '#fef3c7';
  if (st === 'QUALIFIED') return '#d1fae5';
  if (st === 'WON') return '#ede9fe';
  return '#fecdd3';
};

const countStatus = (st: string) => leads.value.filter(l => l.status === st).length;

const showSuccess = (msg: string) => {
  success.value = msg; error.value = null;
  setTimeout(() => { success.value = null; }, 3000);
};
const showError = (msg: string) => {
  error.value = msg; success.value = null;
  setTimeout(() => { error.value = null; }, 4000);
};

const load = async () => {
  loading.value = true;
  error.value = null; success.value = null;
  try {
    if (!canRead.value) { leads.value = []; return; }
    
    // We already do frontend filtering if we get all, but let's pass q if API expects it
    const reqs: Promise<any>[] = [api.get('/crm/leads')];
    if (canReadUsers.value && users.value.length === 0) reqs.push(api.get('/crm/users'));
    
    const [lRes, uRes] = await Promise.all(reqs);
    leads.value = lRes.data?.leads ?? lRes.leads ?? [];
    if (uRes) users.value = uRes.data?.users ?? uRes.users ?? [];
    
    for (const l of leads.value) {
      statusSelection[l.id] = l.status;
      assigneeSelection[l.id] = l.assignedTo?.id ?? '';
    }
  } catch (e: any) { showError(e?.response?.data?.message ?? 'Gagal load leads'); }
  finally { loading.value = false; }
};

const openCreate = () => {
  editingId.value = null;
  form.code = `LD-${Math.floor(Math.random() * 90000) + 10000}`; // auto gen default
  form.name = ''; form.email = ''; form.phone = ''; form.source = ''; form.notes = '';
  dialogError.value = null; dialogOpen.value = true;
};

const openEdit = (l: Lead) => {
  editingId.value = l.id;
  form.code = l.code; form.name = l.name;
  form.email = l.email ?? ''; form.phone = l.phone ?? '';
  form.source = l.source ?? ''; form.notes = l.notes ?? '';
  dialogError.value = null; dialogOpen.value = true;
};

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };

const save = async () => {
  saving.value = true; dialogError.value = null;
  try {
    const payload = {
      name: form.name, email: form.email || undefined, phone: form.phone || undefined,
      source: form.source || undefined, notes: form.notes || undefined,
    };
    
    if (editingId.value) {
      await api.patch(`/crm/leads/${editingId.value}`, payload);
      showSuccess(`Lead ${form.name} berhasil diperbarui.`);
    } else {
      await api.post('/crm/leads', { code: form.code, ...payload });
      showSuccess(`Lead ${form.name} berhasil ditambahkan!`);
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) { dialogError.value = e?.response?.data?.message ?? 'Gagal menyimpan Lead'; }
  finally { saving.value = false; }
};

const updateStatus = async (l: Lead) => {
  try {
    await api.patch(`/crm/leads/${l.id}`, { status: statusSelection[l.id] });
    showSuccess(`Status ${l.name} dirubah jadi ${statusSelection[l.id]}`);
    l.status = statusSelection[l.id]; // optimistic
    // update counts automatically via computed
  } catch (e: any) {
    statusSelection[l.id] = l.status; // rollback
    showError(e?.response?.data?.message ?? 'Gagal update status');
  }
};

const convert = async (l: Lead) => {
  converting.value = l.id;
  try {
    await api.post(`/crm/leads/${l.id}/convert`, {});
    showSuccess(`WOOHOO! Lead ${l.name} berhasil dikonversi jadi Customer (WON)!`);
    await load();
  } catch (e: any) { showError(e?.response?.data?.message ?? 'Gagal men-convert Lead'); }
  finally { converting.value = null; }
};

const assign = async (l: Lead) => {
  try {
    await api.patch(`/crm/leads/${l.id}/assign`, { userId: assigneeSelection[l.id] });
    showSuccess(`Agen penugasan berhasil dipindahkan.`);
  } catch (e: any) {
    assigneeSelection[l.id] = l.assignedTo?.id ?? '';
    showError(e?.response?.data?.message ?? 'Gagal assign user');
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
