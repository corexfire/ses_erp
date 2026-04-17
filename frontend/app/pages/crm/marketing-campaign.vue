<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-fuchsia-500 relative overflow-hidden">
      <div class="absolute right-[-20px] top-[-10px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-megaphone text-[150px] text-fuchsia-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-megaphone text-fuchsia-500"></i> Marketing Campaigns
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Rencanakan acara, monitor budget iklan, dan lacak status kampanye akuisisi pelanggan (Ads, Event, Email).
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="Buat Kampanye Baru" size="small" icon="pi pi-plus" class="bg-fuchsia-600 text-white border-none font-bold shadow-sm hover:bg-fuchsia-700" :disabled="loading || !canCreate" @click="openCreate" />
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

    <!-- KPI Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 items-start animate-fade-in-up">
      <div class="bg-slate-800 border-b-4 border-b-slate-900 rounded-xl p-4 shadow-sm text-white flex justify-between items-center">
        <div>
          <div class="text-[10px] font-black text-fuchsia-300 uppercase tracking-widest">Total Ads Budget</div>
          <div class="text-2xl font-black mt-0.5 text-emerald-400">{{ fmtRp(totalBudget) }}</div>
        </div>
      </div>
      
      <div class="bg-sky-50 border border-sky-200 border-b-4 border-b-sky-500 rounded-xl p-4 shadow-sm flex justify-between items-center">
        <div>
           <div class="text-[10px] font-black text-sky-600 uppercase tracking-widest">Planned (Rencana)</div>
           <div class="text-3xl font-black text-sky-800 mt-0.5">{{ countStatus('PLANNED') }}</div>
        </div>
        <i class="pi pi-calendar text-3xl text-sky-200"></i>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 border-b-4 border-b-emerald-500 rounded-xl p-4 shadow-sm flex justify-between items-center">
        <div>
           <div class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active (Berjalan)</div>
           <div class="text-3xl font-black text-emerald-800 mt-0.5">{{ countStatus('ACTIVE') }}</div>
        </div>
        <i class="pi pi-spin pi-cog text-3xl text-emerald-200"></i>
      </div>

       <div class="bg-slate-50 border border-slate-200 border-b-4 border-b-slate-500 rounded-xl p-4 shadow-sm flex justify-between items-center">
        <div>
           <div class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Completed / Done</div>
           <div class="text-3xl font-black text-slate-800 mt-0.5">{{ countStatus('COMPLETED') }}</div>
        </div>
        <i class="pi pi-flag-fill text-3xl text-slate-200"></i>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center animate-fade-in-up">
      <span class="p-input-icon-left w-72">
         <i class="pi pi-search" />
         <InputText v-model="q" placeholder="Cari Kode Promo, Nama Event, Tipe..." class="w-full text-sm h-10 bg-slate-50 border-slate-200" @keyup.enter="load" />
      </span>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0 border-slate-200 bg-slate-50 hover:bg-slate-100" />
      
       <div class="ml-auto flex gap-1 bg-slate-100 rounded-lg p-1">
        <button v-for="s in ['ACTIVE','PLANNED','ALL']" :key="s"
          @click="statusFilter = s"
          :class="statusFilter === s ? 'bg-fuchsia-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'"
          class="px-4 py-1.5 rounded-md text-[11px] font-black uppercase tracking-widest transition">
          {{ s }}
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[10px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b border-b-slate-200 w-44">Kode Seri</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200">Judul Kampanye & Info Promosi</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 w-36">Ads Channel</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-right w-40">Alokasi Anggaran</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-40">Status Kampanye</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-24">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="6" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-fuchsia-500 shadow-sm"></i> Menghitung performa campaign...</td>
          </tr>
          
          <tr v-for="c in filteredList" v-else :key="c.id" class="transition hover:bg-slate-50 group" :class="{ 'opacity-50 grayscale': c.status === 'CANCELED' }">
            <td class="px-5 py-4 align-top border-l-4" :style="{ borderLeftColor: typeStyle(c.status).bg }">
               <div class="font-mono text-[11px] font-black text-fuchsia-700 bg-fuchsia-50 hover:bg-fuchsia-100 border border-fuchsia-100 px-2 py-0.5 rounded inline-block">
                {{ c.code }}
               </div>
               <div class="text-[9px] font-black uppercase text-slate-400 mt-2">DUE: {{ c.endDate ? formatDate(c.endDate) : 'UNLIMITED' }}</div>
            </td>
            
            <td class="px-4 py-4 align-top border-l">
              <div class="font-bold text-slate-800 text-sm leading-tight max-w-sm mb-1.5" :class="{'line-through': c.status === 'CANCELED'}">
                {{ c.name }}
              </div>
              <div class="text-[11px] font-medium text-slate-500 max-w-sm leading-relaxed" v-if="c.notes"><i class="pi pi-info-circle text-[9px]"></i> {{ c.notes }}</div>
            </td>

             <td class="px-4 py-4 align-top border-l">
                <div class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 border text-[10px] font-black uppercase tracking-widest text-slate-600">
                  <i class="pi" :class="getChannelIcon(c.channel)"></i> {{ c.channel || 'GENERAL' }}
                </div>
            </td>

            <td class="px-4 py-4 align-top border-l text-right">
              <div class="font-mono text-sm font-black" :class="c.budget ? 'text-emerald-600' : 'text-slate-400'">
                {{ fmtRp(c.budget || 0) }}
              </div>
            </td>

            <td class="px-4 py-4 align-top border-l text-center">
               <select v-model="statusSelection[c.id]"
                class="w-full h-8 rounded appearance-none text-center text-[10px] font-black uppercase tracking-widest outline-none transition cursor-pointer"
                :disabled="!canUpdate"
                :style="typeStyle(statusSelection[c.id])"
                @change="updateStatus(c)">
                <option value="PLANNED" class="bg-white text-slate-800">PLANNED</option>
                <option value="ACTIVE" class="bg-white text-slate-800">ACTIVE</option>
                <option value="COMPLETED" class="bg-white text-slate-800">COMPLETED</option>
                <option value="CANCELED" class="bg-white text-slate-800">CANCELED</option>
              </select>
            </td>

             <td class="px-4 py-4 align-top border-l text-center">
              <div class="flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button icon="pi pi-pencil" v-tooltip="'Edit Promo'" size="small" outlined class="h-8 w-8 text-[11px] px-0 bg-white" severity="secondary" @click="openEdit(c)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredList.length === 0">
            <td colspan="6" class="py-16 text-center text-slate-400 italic text-sm">
               <i class="pi pi-megaphone text-3xl mb-3 block text-slate-300"></i>
               Tidak ada Marketing Campaign yang tercatat.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Drawer -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="closeDialog">
      <div class="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-xl" style="borderTop: 4px solid #c026d3;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-pencil text-fuchsia-600" v-if="editingId"></i>
             <i class="pi pi-plus text-fuchsia-600" v-else></i>
            {{ editingId ? 'Update Info Campaign' : 'Rancangan Campaign Baru' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-200 w-8 h-8 rounded-full font-bold" @click="closeDialog">✕</button>
        </div>
        
        <div class="p-6 space-y-5 flex-1">
          <div class="space-y-1.5" v-if="editingId">
            <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">ID Rekaman (Readonly)</label>
            <input type="text" v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-bold bg-slate-50 text-slate-500 outline-none" disabled />
          </div>
          <div class="space-y-1.5" v-else>
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode Seri <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-fuchsia-700 outline-none focus:border-fuchsia-500 shadow-inner" placeholder="Otomatis digenerate jika kosong" />
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Event Promo / Ads <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-fuchsia-500 shadow-inner" placeholder="Diskon Lebaran 2026..." :disabled="editingId ? !canUpdate : !canCreate" />
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Ads Channel</label>
               <input type="text" v-model="form.channel" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-fuchsia-500 bg-slate-50" placeholder="Meta Ads, Email, dsb." :disabled="editingId ? !canUpdate : !canCreate" />
             </div>
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">Estimasi Budget</label>
               <input type="number" v-model="form.budget" class="w-full border rounded-lg px-3 py-2 text-sm font-black text-emerald-700 outline-none focus:border-emerald-500 bg-emerald-50 text-right shadow-inner" placeholder="Rp 0" :disabled="editingId ? !canUpdate : !canCreate" />
             </div>
          </div>

          <div class="grid grid-cols-2 gap-4 pt-2 border-t border-dashed">
            <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
               <input type="date" v-model="form.startDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-fuchsia-500 bg-slate-50" :disabled="editingId ? !canUpdate : !canCreate" />
            </div>
            <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Target End Date</label>
               <input type="date" v-model="form.endDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-fuchsia-500 bg-slate-50" :disabled="editingId ? !canUpdate : !canCreate" />
            </div>
          </div>

          <div class="space-y-1.5 pt-2 border-t border-dashed">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Sasaran (Goal) & Catatan Penting</label>
            <textarea v-model="form.notes" rows="4" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-fuchsia-500 shadow-inner resize-none"></textarea>
          </div>

          <div v-if="dialogError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200 font-bold border-l-4 border-l-red-500">{{ dialogError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="closeDialog" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editingId ? 'Simpan Perubahan' : 'Rilis Campaign'" :loading="saving" :disabled="!form.name"
            @click="save" class="bg-fuchsia-600 border-none text-white font-bold px-6" icon="pi pi-check" />
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
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
</style>
