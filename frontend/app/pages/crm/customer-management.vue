<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-indigo-500 relative overflow-hidden">
      <div class="absolute right-[-15px] top-[-10px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-building text-[150px] text-indigo-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-book text-indigo-600"></i> Customer Management
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Master Data Pelanggan Resmi. Kelola informasi penagihan, alamat pengiriman, dan status keaktifan klien bisnis Anda.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="Registrasi Klien Baru" size="small" icon="pi pi-plus" class="bg-indigo-600 text-white border-none font-bold shadow-sm hover:bg-indigo-700" :disabled="loading || !canCreate" @click="openCreate" />
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
          <div class="text-[10px] font-black text-slate-400 text-indigo-300 uppercase tracking-widest">Total Klien Mendaftar</div>
          <div class="text-3xl font-black mt-0.5">{{ customers.length }}</div>
        </div>
        <div class="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center"><i class="pi pi-book text-xl text-slate-300"></i></div>
      </div>
      
      <div class="bg-emerald-50 border border-emerald-200 border-b-4 border-b-emerald-500 rounded-xl p-4 shadow-sm flex justify-between items-center">
        <div>
           <div class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Client</div>
           <div class="text-3xl font-black text-emerald-700 mt-0.5">{{ countStatus(true) }}</div>
        </div>
        <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center"><i class="pi pi-check-circle text-emerald-600"></i></div>
      </div>
      
      <div class="bg-rose-50 border border-rose-200 border-b-4 border-b-rose-500 rounded-xl p-4 shadow-sm flex justify-between items-center">
        <div>
           <div class="text-[10px] font-black text-rose-600 uppercase tracking-widest">Inactive / Suspended</div>
           <div class="text-3xl font-black text-rose-700 mt-0.5">{{ countStatus(false) }}</div>
        </div>
        <div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center"><i class="pi pi-minus-circle text-rose-600"></i></div>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center animate-fade-in-up">
      <div class="flex gap-1 bg-slate-100 rounded-lg p-1">
        <button v-for="s in ['Semua', 'Aktif', 'Inaktif']" :key="s"
          @click="statusFilter = s"
          :class="statusFilter === s ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'"
          class="px-4 py-1.5 rounded-md text-[11px] font-black uppercase tracking-widest transition">
          {{ s }}
        </button>
      </div>
      <div class="w-px h-6 bg-slate-200 mx-1"></div>
      <span class="p-input-icon-left w-72">
         <i class="pi pi-search" />
         <InputText v-model="q" placeholder="Cari PT, nama klien, atau lokasi..." class="w-full text-sm h-10 bg-slate-50 border-slate-200" @keyup.enter="load" />
      </span>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0 border-slate-200 bg-slate-50 hover:bg-slate-100" />
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[10px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b border-b-slate-200 w-32 hidden md:table-cell">Reg. ID</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200">Profil Pelanggan & Instansi</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200">Kontak Person</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 hidden md:table-cell w-44">Domisili / Wilayah</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-28">Status</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-24">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="6" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-indigo-600 shadow-sm"></i> Sinkronisasi Buku Klien...</td>
          </tr>
          
          <tr v-for="c in filteredList" v-else :key="c.id" class="transition hover:bg-slate-50 group">
            <td class="px-5 py-4 align-top hidden md:table-cell border-l-4" :style="{ borderLeftColor: c.isActive ? '#10b981' : '#f43f5e' }">
               <div class="font-mono text-[10px] font-black text-indigo-700 mt-1 cursor-pointer hover:underline" @click="navigateTo(`/crm/customers/${c.id}`)">
                {{ c.code }}
               </div>
               <div class="text-[9px] font-bold text-slate-400 mt-1" v-if="c.createdAt">{{ formatDate(c.createdAt) }}</div>
            </td>
            
            <td class="px-4 py-4 align-top md:border-l">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded flex items-center justify-center font-black text-[12px] text-white shrink-0 shadow-sm"
                  :style="{ backgroundColor: avatarColor(c.name) }">
                  {{ initials(c.name) }}
                </div>
                <div class="min-w-0">
                  <div class="font-bold text-slate-800 text-sm leading-tight max-w-[200px]" :title="c.name">
                    <span class="md:hidden font-mono text-[9px] block text-indigo-500 mb-0.5">{{ c.code }}</span>
                    {{ c.name }}
                  </div>
                  <div class="text-[10px] font-medium text-slate-500 mt-1 truncate max-w-[200px] leading-relaxed">
                     <i class="pi pi-map-marker text-[9px]"></i> {{ c.address1 || 'Alamat tidak diatur' }}
                  </div>
                </div>
              </div>
            </td>

             <td class="px-4 py-4 align-top border-l">
              <div class="text-[12px] font-bold text-slate-700 truncate"><i class="pi pi-envelope text-slate-400 mr-2"></i> {{ c.email ?? '-' }}</div>
              <div class="text-[12px] font-bold text-slate-700 truncate mt-1"><i class="pi pi-phone text-slate-400 mr-2"></i> {{ c.phone ?? '-' }}</div>
            </td>

            <td class="px-4 py-4 align-top border-l hidden md:table-cell text-[11px] font-bold text-slate-600 uppercase tracking-wide">
              {{ c.city || '-' }}
            </td>

            <td class="px-4 py-4 align-top border-l text-center">
              <div :class="c.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'" class="inline-flex items-center justify-center px-2 py-0.5 rounded-md border text-[9px] font-black uppercase tracking-widest min-w-[70px]">
                 <span v-if="c.isActive"><i class="pi pi-circle-fill text-[6px] mr-1 animate-pulse"></i> Aktif</span>
                 <span v-else><i class="pi pi-minus-circle text-[8px] mr-1"></i> Suspend</span>
              </div>
              <div v-if="canDeactivate" class="mt-2">
                 <button @click="deactivate(c)" class="text-[9px] font-bold text-slate-400 hover:text-slate-800 underline opacity-0 group-hover:opacity-100 transition-opacity">
                   Ubah Status
                 </button>
              </div>
            </td>
            
            <td class="px-4 py-4 align-top border-l text-center">
              <div class="flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button icon="pi pi-pencil" v-tooltip="'Update Profil'" size="small" outlined class="h-8 w-8 text-[11px] px-0 bg-slate-50" severity="secondary" @click="openEdit(c)" />
                <Button icon="pi pi-external-link" v-tooltip="'Buka Kartu'" size="small" outlined class="h-8 w-8 text-[11px] px-0 bg-slate-50" severity="secondary" @click="navigateTo(`/crm/customers/${c.id}`)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredList.length === 0">
            <td colspan="6" class="py-16 text-center text-slate-400 italic text-sm">
               <i class="pi pi-inbox text-3xl mb-3 block text-slate-300"></i>
               Tidak ada pelanggan ditemukan sesuai filter.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Drawer -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="closeDialog">
      <div class="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-xl" style="borderTop: 4px solid #4f46e5;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-pencil text-indigo-600" v-if="editingId"></i>
             <i class="pi pi-user-plus text-indigo-600" v-else></i>
            {{ editingId ? 'Update Info Pelanggan' : 'Pendaftaran Pelanggan Baru' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-200 w-8 h-8 rounded-full font-bold" @click="closeDialog">✕</button>
        </div>
        
        <div class="p-6 space-y-5 flex-1">
          <div class="space-y-1.5" v-if="editingId">
            <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">ID Member Registrasi (Readonly)</label>
            <input type="text" v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-bold bg-slate-50 text-slate-500 outline-none" disabled />
          </div>
          <div class="space-y-1.5" v-else>
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">ID Member <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-indigo-700 outline-none focus:border-indigo-500 shadow-inner" placeholder="Otomatis digenerate jika kosong" />
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Lengkap / Instansi PT <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 shadow-inner" placeholder="PT Surya Abadi Makmur" :disabled="editingId ? !canUpdate : !canCreate" />
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Alamat Email Tagihan</label>
               <input type="email" v-model="form.email" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500" placeholder="finance@klien.com" :disabled="editingId ? !canUpdate : !canCreate" />
             </div>
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Telepon Kantor/PIC</label>
               <input type="text" v-model="form.phone" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500" placeholder="021-xxxx" :disabled="editingId ? !canUpdate : !canCreate" />
             </div>
          </div>

          <div class="space-y-1.5 pt-2 border-t border-dashed">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><i class="pi pi-home"></i> Alamat Jalan L1</label>
            <textarea v-model="form.address1" rows="2" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 resize-none bg-slate-50" placeholder="Jl. Raya Utama Kav 45..." :disabled="editingId ? !canUpdate : !canCreate"></textarea>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="space-y-1.5 md:col-span-2">
                 <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kota / Kab</label>
                 <input type="text" v-model="form.city" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 bg-slate-50" placeholder="Jakarta Selatan" :disabled="editingId ? !canUpdate : !canCreate" />
              </div>
              <div class="space-y-1.5 md:col-span-2">
                 <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Provinsi</label>
                 <input type="text" v-model="form.province" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 bg-slate-50" placeholder="DKI Jakarta" :disabled="editingId ? !canUpdate : !canCreate" />
              </div>
              <div class="space-y-1.5 md:col-span-2">
                 <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode Pos</label>
                 <input type="text" v-model="form.postalCode" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 bg-slate-50" placeholder="12xxx" :disabled="editingId ? !canUpdate : !canCreate" />
              </div>
              <div class="space-y-1.5 md:col-span-2">
                 <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Negara</label>
                 <input type="text" v-model="form.countryCode" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 bg-slate-50 uppercase" placeholder="ID" :disabled="editingId ? !canUpdate : !canCreate" maxlength="2" />
              </div>
          </div>

          <div v-if="dialogError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200 font-bold border-l-4 border-l-red-500">{{ dialogError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="closeDialog" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editingId ? 'Simpan Profil' : 'Daftarkan'" :loading="saving" :disabled="!form.name"
            @click="save" class="bg-indigo-600 border-none text-white font-bold px-6" icon="pi pi-check" />
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
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
</style>
