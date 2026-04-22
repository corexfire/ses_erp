<template>
  <div class="space-y-6">
    <!-- Header (Premium Customer style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-indigo-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">CRM Management</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Customer Records</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Customer <span class="text-indigo-600 italic">Management</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-xl">Master Data Pelanggan Resmi. Kelola informasi penagihan, alamat pengiriman, dan status keaktifan klien bisnis Anda secara terpusat.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Registrasi Klien Baru" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-indigo-600 border-none text-white font-black text-[10px] uppercase shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all" :disabled="loading || !canCreate" @click="openCreate" />
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
       <!-- Total Customers Banner - High Contrast -->
      <div class="p-4 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between border border-slate-800 transition-all hover:bg-slate-950 group">
        <div class="text-[10px] font-black uppercase text-indigo-300 tracking-[0.2em] mb-4 opacity-80">Total Registered Klien</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter">{{ customers.length }}</h3>
          <div class="p-3 bg-slate-700 rounded-xl text-slate-100 shadow-lg">
            <i class="pi pi-book text-lg"></i>
          </div>
        </div>
      </div>

      <!-- Active Banners -->
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em] mb-4">Active Accounts</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-600 tracking-tighter">{{ countStatus(true) }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-500 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>
      
      <!-- Inactive Banners -->
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-500 tracking-[0.2em] mb-4">Suspended / Inactive</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-600 tracking-tighter">{{ countStatus(false) }}</h3>
          <div class="p-3 bg-rose-50 text-rose-500 rounded-xl border border-rose-100"><i class="pi pi-minus-circle text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Controls (Standardized Premium Style) -->
    <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-wrap gap-4 items-center animate-fade-in-up">
      <div class="flex gap-1.5 bg-slate-100 rounded-2xl p-1.5">
        <button v-for="s in ['Semua', 'Aktif', 'Inaktif']" :key="s"
          @click="statusFilter = s"
          :class="statusFilter === s ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-slate-200'"
          class="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all">
          {{ s }}
        </button>
      </div>

      <div class="relative flex-1 max-w-sm">
        <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
        <InputText v-model="q" placeholder="Cari PT, nama klien, atau lokasi..." class="w-full pl-10 h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white transition-all text-sm font-bold shadow-inner" @keyup.enter="load" />
      </div>
      <div class="flex items-center gap-2">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" class="h-12 w-12 border-slate-200 text-slate-500 hover:text-indigo-600 transition-all" />
      </div>
    </div>

    <!-- === TABLE VIEW (Premium Inventory Style) === -->
    <div class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50/80 text-left">
          <tr>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-32 hidden md:table-cell text-center">Reference</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profil Pelanggan & Instansi</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kontak Bisnis</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:table-cell w-44">Wilayah</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-32">Status Keanggotaan</th>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-24 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-if="loading">
             <td colspan="6" class="py-24 text-center">
              <i class="pi pi-spinner pi-spin text-4xl text-indigo-600 opacity-20"></i>
              <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Sinkronisasi Buku Klien...</div>
            </td>
          </tr>
          
          <tr v-for="c in filteredList" v-else :key="c.id" class="transition-all hover:bg-slate-50/50 group">
            <td class="px-8 py-6 align-middle hidden md:table-cell">
               <div class="font-mono text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 cursor-pointer hover:bg-indigo-100 inline-block text-center w-full transition-colors" @click="navigateTo(`/crm/customers/${c.id}`)">
                {{ c.code }}
               </div>
               <div class="text-[9px] font-black text-slate-300 mt-2 text-center uppercase tracking-widest whitespace-nowrap" v-if="c.createdAt">{{ formatDate(c.createdAt) }}</div>
            </td>
            
            <td class="px-6 py-6 align-middle">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-[14px] text-white shrink-0 shadow-lg relative overflow-hidden group-hover:rotate-3 transition-transform"
                  :style="{ backgroundColor: avatarColor(c.name) }">
                  {{ initials(c.name) }}
                  <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div class="min-w-0">
                  <div class="font-black text-slate-900 text-[14px] tracking-tight leading-tight uppercase" :title="c.name">
                    {{ c.name?.toLowerCase() }}
                  </div>
                  <div class="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest flex items-center gap-1.5 leading-relaxed">
                     <i class="pi pi-map-marker text-[10px] text-indigo-400"></i> {{ c.address1 || 'No Registered Address' }}
                  </div>
                </div>
              </div>
            </td>

             <td class="px-6 py-6 align-middle border-l border-slate-50/50">
              <div class="flex flex-col gap-1.5">
                <div class="text-[11px] font-bold text-slate-700 flex items-center gap-2"><i class="pi pi-envelope text-slate-300 text-[10px]"></i> {{ c.email ?? 'no-email@set.id' }}</div>
                <div class="text-[11px] font-bold text-slate-700 flex items-center gap-2"><i class="pi pi-phone text-slate-300 text-[10px]"></i> {{ c.phone ?? 'No Phone' }}</div>
              </div>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50 hidden md:table-cell">
              <div class="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em] px-2.5 py-1 bg-slate-100 rounded-md inline-block">
                {{ c.city || 'GLOBAL' }}
              </div>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-center">
              <div :class="c.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'" 
                class="inline-flex items-center justify-center px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-[0.15em] min-w-[100px] shadow-sm">
                 <span v-if="c.isActive" class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> VERIFIED</span>
                 <span v-else class="flex items-center gap-1.5">SUSPENDED</span>
              </div>
              <div v-if="canDeactivate" class="mt-2">
                 <button @click="deactivate(c)" class="text-[9px] font-black text-slate-300 hover:text-indigo-600 uppercase tracking-widest transition-colors opacity-0 group-hover:opacity-100 underline decoration-dotted">
                   Toggle Status
                 </button>
              </div>
            </td>
            
            <td class="px-8 py-6 align-middle border-l border-slate-50/50 text-right">
              <div class="flex justify-end gap-2 opacity-0 lg:group-hover:opacity-100 transition-all duration-300 translate-x-4 lg:group-hover:translate-x-0">
                <Button icon="pi pi-pencil" v-tooltip.left="'Update Profile'" severity="secondary" text rounded class="h-10 w-10 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50" @click="openEdit(c)" />
                <Button icon="pi pi-external-link" v-tooltip.left="'Client Portal'" severity="secondary" text rounded class="h-10 w-10 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50" @click="navigateTo(`/crm/customers/${c.id}`)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredList.length === 0">
            <td colspan="6" class="py-32 text-center text-slate-400">
               <i class="pi pi-inbox text-5xl opacity-10 mb-4 block"></i>
               <div class="text-[10px] font-black uppercase tracking-[0.2em]">Data Pelanggan Kosong / Mis-filter</div>
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
          <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div class="relative flex items-center gap-5">
             <div class="w-16 h-16 rounded-[1.5rem] bg-indigo-900 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
                <i class="pi pi-user-plus text-3xl" v-if="!editingId"></i>
                <i class="pi pi-pencil text-3xl" v-else></i>
             </div>
             <div>
                <h4 class="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">{{ editingId ? 'Update Detail' : 'Registrasi' }} <span class="text-indigo-600 italic">Pelanggan</span></h4>
                <p class="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mt-2 px-1 border-l-2 border-indigo-500">Corporate Master Database Integration</p>
             </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="closeDialog" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body -->
        <div class="p-12 space-y-10 flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar">
          <!-- Identification Section -->
          <div class="space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black shadow-lg">01</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Legal Identification & Reference</h4>
            </div>
            <div class="pl-11 space-y-8">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Reference / Member ID Code</label>
                <input type="text" v-model="form.code" 
                  class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-black font-mono text-indigo-600 outline-none focus:ring-2 focus:ring-indigo-100 disabled:opacity-60 transition-all uppercase" 
                  :disabled="!!editingId" placeholder="AUTO-GENERATE" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Customer Legal Name / Corporate PT <span class="text-rose-500">*</span></label>
                <input type="text" v-model="form.name" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-100 placeholder:italic" placeholder="e.g. PT SURYA ABADI MAKMAUR" />
              </div>
            </div>
          </div>

          <!-- Contact Section -->
          <div class="space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black shadow-lg">02</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-900">Communication & Point of Contact</h4>
            </div>
            <div class="pl-11 grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Primary Billing Email</label>
                <input type="email" v-model="form.email" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-300" placeholder="finance@klien.com" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Office Phone (HQ)</label>
                <input type="text" v-model="form.phone" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-300" placeholder="021-XXXX" />
              </div>
            </div>
          </div>

          <!-- Address Section -->
          <div class="space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-[10px] font-black shadow-sm">03</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Logistics & HQ Address Profile</h4>
            </div>
            <div class="pl-11 space-y-8">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Primary Business Address</label>
                <textarea v-model="form.address1" rows="3" class="w-full rounded-2xl border-none bg-white shadow-inner p-4 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-indigo-100 resize-none placeholder:italic" placeholder="Full street address, building info..."></textarea>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">City / Kabupaten Location</label>
                   <input type="text" v-model="form.city" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-300" />
                </div>
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Province Region</label>
                   <input type="text" v-model="form.province" class="w-full h-14 rounded-2xl border-none bg-white shadow-inner px-6 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-300" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="dialogError" class="ml-11 rounded-2xl bg-rose-50 px-5 py-4 text-[11px] text-rose-600 border border-rose-100 font-black uppercase tracking-widest shadow-sm">
            <i class="pi pi-exclamation-circle mr-2"></i> {{ dialogError }}
          </div>
        </div>
        
        <!-- Dialog Footer -->
        <div class="p-10 border-t bg-white flex justify-end items-center gap-4 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <Button label="Batal & Tutup" severity="secondary" text @click="closeDialog" class="px-8 h-14 font-black text-[10px] uppercase tracking-widest" :disabled="saving" />
          <Button :label="editingId ? 'Sinkronisasi Profil' : 'Daftarkan Pelanggan'" :loading="saving" :disabled="!form.name"
            @click="save" class="p-button-rounded h-14 px-12 bg-indigo-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-check-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

type Customer = {
  id: string; code: string; name: string;
  email?: string | null; phone?: string | null;
  address1?: string | null; address2?: string | null; city?: string | null;
  province?: string | null; postalCode?: string | null; countryCode?: string | null;
  isActive: boolean; createdAt?: string;
};

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('crm.customer.read'));
const canCreate = computed(() => auth.hasPermission('crm.customer.create'));
const canUpdate = computed(() => auth.hasPermission('crm.customer.update'));
const canDeactivate = computed(() => auth.hasPermission('crm.customer.deactivate'));

const q = ref('');
const statusFilter = ref('Semua');
const loading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const customers = ref<Customer[]>([]);

const filteredList = computed(() => {
  let res = customers.value;
  if (statusFilter.value === 'Aktif') res = res.filter(c => c.isActive);
  if (statusFilter.value === 'Inaktif') res = res.filter(c => !c.isActive);
  
  if (q.value) {
    const s = q.value.toLowerCase();
    res = res.filter(o => o.name.toLowerCase().includes(s) || o.code.toLowerCase().includes(s) || 
                          (o.city||'').toLowerCase().includes(s) || (o.address2||'').toLowerCase().includes(s));
  }
  return res;
});

const countStatus = (st: boolean) => customers.value.filter(c => c.isActive === st).length;

const dialogOpen = ref(false);
const saving = ref(false);
const dialogError = ref<string | null>(null);
const editingId = ref<string | null>(null);

const form = reactive({ code: '', name: '', email: '', phone: '', address1: '', address2: '', city: '', province: '', postalCode: '', countryCode: 'ID' });

// AVATAR & DATE LOGIC
const AVATAR_COLORS = ['#3b82f6','#8b5cf6','#ec4899','#f97316','#10b981','#06b6d4','#f59e0b', '#334155'];
const avatarColor = (n: string) => AVATAR_COLORS[(n?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
const initials = (n?: string) => {
  if (!n) return 'C';
  const p = n.trim().split(' ').filter(x => x.length > 0 && x.toLowerCase() !== 'pt' && x.toLowerCase() !== 'cv');
  return p.length > 1 ? (p[0][0] + p[p.length-1][0]).toUpperCase() : p[0].substring(0, 2).toUpperCase();
};
const formatDate = (iso: string) => {
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
};

const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const load = async () => {
  loading.value = true; error.value = null; success.value = null;
  try {
    if (!canRead.value) { customers.value = []; return; }
    const res = await api.get('/crm/customers');
    customers.value = res.data?.customers ?? res.customers ?? [];
  } catch (e: any) { error.value = e?.response?.data?.message ?? 'Gagal load Master Customer'; } 
  finally { loading.value = false; }
};

const openCreate = () => {
  editingId.value = null;
  form.code = `CUS-${Math.floor(Math.random()*90000)+10000}`;
  form.name = ''; form.email = ''; form.phone = '';
  form.address1 = ''; form.address2 = ''; form.city = ''; form.province = ''; form.postalCode = ''; form.countryCode = 'ID';
  dialogError.value = null; dialogOpen.value = true;
};

const openEdit = (c: Customer) => {
  editingId.value = c.id; form.code = c.code; form.name = c.name;
  form.email = c.email ?? ''; form.phone = c.phone ?? '';
  form.address1 = c.address1 ?? ''; form.address2 = c.address2 ?? '';
  form.city = c.city ?? ''; form.province = c.province ?? '';
  form.postalCode = c.postalCode ?? ''; form.countryCode = c.countryCode ?? 'ID';
  dialogError.value = null; dialogOpen.value = true;
};

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };

const save = async () => {
  saving.value = true; dialogError.value = null;
  try {
    const payload = {
      name: form.name, email: form.email || undefined, phone: form.phone || undefined,
      address1: form.address1 || undefined, address2: form.address2 || undefined,
      city: form.city || undefined, province: form.province || undefined,
      postalCode: form.postalCode || undefined, countryCode: form.countryCode || undefined,
    };
    if (editingId.value) {
      await api.patch(`/crm/customers/${editingId.value}`, payload);
      showMsg(success, `Profil Pelanggan ${form.name} diperbarui!`);
    } else {
      await api.post('/crm/customers', { code: form.code, ...payload });
      showMsg(success, `Sukses mendaftar pelanggan ${form.name}!`);
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) { dialogError.value = e?.response?.data?.message ?? 'Gagal simpan formulir'; } 
  finally { saving.value = false; }
};

const deactivate = async (c: Customer) => {
  try {
    await api.patch(`/crm/customers/${c.id}/deactivate`);
    showMsg(success, `Status ${c.name} telah dialihkan.`);
    c.isActive = !c.isActive;
  } catch (e: any) {
    showMsg(error, e?.response?.data?.message ?? 'Gagal mengubah status');
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
