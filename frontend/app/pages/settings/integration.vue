<template>
  <div class="space-y-4">
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-teal-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Settings & Tools</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Integration (API)</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">API <span class="text-teal-600 not-italic text-3xl">Integration</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3">Kelola koneksi API eksternal, webhook, dan token integrasi sistem pihak ketiga.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Generate API Key" size="small" icon="pi pi-key" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase" @click="generateKey" />
          <Button label="+ Tambah Integrasi" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-teal-600 border-none text-white font-black text-[10px] uppercase shadow-xl hover:scale-105 transition-all" @click="openCreate" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <div class="p-4 rounded-2xl bg-teal-950 text-white shadow-xl flex flex-col justify-between border border-teal-900 hover:bg-black group transition-all">
        <div class="text-[10px] font-black uppercase text-teal-400 tracking-[0.2em] mb-4">Total Integrasi</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ integrations.length }}</h3><div class="p-3 bg-white/5 rounded-xl group-hover:rotate-12 transition-transform"><i class="pi pi-link text-lg"></i></div></div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Terhubung</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ integrations.filter(i => i.status === 'CONNECTED').length }}</h3><div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div></div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-orange-600 tracking-[0.2em] mb-4">Webhook</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-orange-700 tracking-tighter leading-none">{{ integrations.filter(i => i.type === 'WEBHOOK').length }}</h3><div class="p-3 bg-orange-50 text-orange-600 rounded-xl border border-orange-100"><i class="pi pi-wifi text-lg"></i></div></div>
      </div>
      <div class="p-4 rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-teal-100 tracking-[0.2em] mb-4">SSL Secured</div>
        <div class="flex items-end justify-between"><h3 class="text-xl font-black text-white tracking-tight uppercase">TLS <span class="text-teal-300 italic">1.3</span></h3><div class="p-3 bg-white/10 rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-shield text-lg"></i></div></div>
      </div>
    </div>

    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden mt-6 pb-20">
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-xl"><i class="pi pi-link text-xl"></i></div>
          <div><h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] mb-1">API Integration Registry</h3><p class="text-[9px] font-bold text-slate-400 uppercase font-mono">External System Connectors</p></div>
        </div>
        <select v-model="filterType" class="border border-slate-200 rounded-2xl px-4 py-2 text-[10px] font-black uppercase text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400">
          <option value="">Semua Tipe</option>
          <option value="API">API</option>
          <option value="WEBHOOK">Webhook</option>
          <option value="OAUTH">OAuth</option>
        </select>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-white text-left border-b border-slate-50">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Sistem / Provider</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Tipe</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Endpoint</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Last Sync</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Status</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="i in filteredIntegrations" :key="i.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-teal-400">
              <td class="px-8 py-5">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform"><i class="pi pi-server text-sm"></i></div>
                  <div><div class="font-black text-[11px] text-slate-800">{{ i.name }}</div><div class="text-[9px] font-bold text-slate-400 mt-0.5">{{ i.description }}</div></div>
                </div>
              </td>
              <td class="px-6 py-5 border-l border-slate-50">
                <span :class="['text-[9px] font-black px-2 py-0.5 rounded uppercase border', i.type === 'API' ? 'bg-sky-100 text-sky-700 border-sky-200' : i.type === 'WEBHOOK' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-violet-100 text-violet-700 border-violet-200']">{{ i.type }}</span>
              </td>
              <td class="px-6 py-5 border-l border-slate-50"><code class="font-mono text-[10px] text-slate-500 truncate max-w-[220px] block">{{ i.endpoint }}</code></td>
              <td class="px-6 py-5 border-l border-slate-50"><span class="text-[10px] font-bold text-slate-500">{{ i.lastSync }}</span></td>
              <td class="px-6 py-5 border-l border-slate-50 text-center">
                <span :class="['inline-flex rounded-full px-3 py-1 text-[9px] font-black uppercase border items-center gap-1.5', i.status === 'CONNECTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200']">
                  <span :class="['w-1.5 h-1.5 rounded-full animate-pulse', i.status === 'CONNECTED' ? 'bg-emerald-400' : 'bg-rose-400']"></span>
                  {{ i.status }}
                </span>
              </td>
              <td class="px-8 py-5 border-l border-slate-50 text-right">
                <div class="opacity-0 group-hover:opacity-100 transition-all flex justify-end gap-2">
                  <Button icon="pi pi-eye" severity="secondary" rounded outlined size="small" class="w-8 h-8" @click="openView(i)" v-tooltip.top="'Detail'" />
                  <Button icon="pi pi-pencil" severity="secondary" rounded outlined size="small" class="w-8 h-8 border-teal-200 text-teal-600 hover:bg-teal-600 hover:text-white" @click="openEdit(i)" v-tooltip.top="'Edit'" />
                  <Button icon="pi pi-play" severity="secondary" rounded outlined size="small" class="w-8 h-8 border-sky-200 text-sky-600" @click="testConn(i)" v-tooltip.top="'Test'" />
                  <Button icon="pi pi-trash" severity="danger" rounded outlined size="small" class="w-8 h-8" @click="confirmDelete(i)" v-tooltip.top="'Hapus'" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- VIEW DIALOG -->
    <div v-if="viewDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="viewDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-lg bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-teal-900 overflow-hidden animate-scale-in">
        <div class="p-8 border-b border-slate-100 flex items-center justify-between relative overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-teal-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-14 h-14 rounded-[1.5rem] bg-teal-600 text-white flex items-center justify-center shadow-xl"><i class="pi pi-link text-2xl"></i></div>
            <div>
              <h3 class="text-xl font-black text-slate-900 uppercase">{{ selected?.name }}</h3>
              <span :class="['text-[9px] font-black px-2 py-0.5 rounded uppercase border mt-1 inline-block', selected?.status === 'CONNECTED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200']">{{ selected?.status }}</span>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="viewDialog = false" class="relative z-10 h-10 w-10" />
        </div>
        <div class="p-8 space-y-4 bg-slate-50/30">
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl bg-white border border-slate-100"><p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tipe</p><p class="text-[12px] font-black text-slate-900 mt-1">{{ selected?.type }}</p></div>
            <div class="p-4 rounded-2xl bg-white border border-slate-100"><p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Sync</p><p class="text-[12px] font-black text-slate-900 mt-1">{{ selected?.lastSync }}</p></div>
          </div>
          <div class="p-4 rounded-2xl bg-white border border-slate-100"><p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Deskripsi</p><p class="text-[11px] text-slate-700">{{ selected?.description }}</p></div>
          <div class="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Endpoint URL</p>
            <code class="text-[11px] font-mono text-teal-400 break-all">{{ selected?.endpoint }}</code>
          </div>
          <div class="p-4 rounded-2xl bg-white border border-slate-100" v-if="selected?.apiKey">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">API Key (masked)</p>
            <code class="text-[11px] font-mono text-slate-600">{{ selected?.apiKey }}</code>
          </div>
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-end gap-3">
          <Button label="Test Koneksi" icon="pi pi-play" class="h-11 px-8 bg-teal-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="viewDialog = false; testConn(selected)" />
          <Button label="Edit" icon="pi pi-pencil" severity="secondary" outlined rounded class="h-11 px-8 font-black text-[10px] uppercase" @click="viewDialog = false; openEdit(selected)" />
          <Button label="Tutup" severity="secondary" text @click="viewDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>

    <!-- CREATE / EDIT DIALOG -->
    <div v-if="formDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="formDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-lg bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-teal-900 overflow-hidden animate-scale-in max-h-[92vh] flex flex-col">
        <div class="p-8 border-b border-slate-100 flex items-center justify-between relative overflow-hidden shrink-0">
          <div class="absolute top-0 right-0 w-40 h-40 bg-teal-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-14 h-14 rounded-[1.5rem] bg-teal-600 text-white flex items-center justify-center shadow-xl rotate-3 hover:rotate-0 transition-transform"><i class="pi pi-link text-2xl"></i></div>
            <div><h3 class="text-xl font-black text-slate-900 uppercase">{{ isEdit ? 'Edit' : 'Tambah' }} Integrasi</h3><p class="text-[10px] font-black text-teal-600 uppercase mt-1">API Integration Config</p></div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="formDialog = false" class="relative z-10 h-10 w-10" />
        </div>
        <div class="flex-1 overflow-y-auto p-8 space-y-4 bg-slate-50/30">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nama Sistem / Provider</label>
            <input v-model="form.name" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[12px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="e.g. WhatsApp Business API" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Deskripsi</label>
            <textarea v-model="form.description" rows="2" class="w-full border border-slate-200 rounded-2xl px-4 py-3 text-[11px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"></textarea>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tipe</label>
            <div class="flex gap-3">
              <button v-for="t in ['API','WEBHOOK','OAUTH']" :key="t" @click="form.type = t" :class="['flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all', form.type === t ? 'bg-teal-600 text-white border-teal-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200']">{{ t }}</button>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Endpoint URL</label>
            <input v-model="form.endpoint" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-mono text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="https://api.example.com/v2" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">API Key / Token</label>
            <input v-model="form.apiKey" type="password" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[12px] font-mono text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="sk-xxxx..." />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</label>
            <div class="flex gap-3">
              <button v-for="s in ['CONNECTED','DISCONNECTED']" :key="s" @click="form.status = s" :class="['px-5 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all', form.status === s ? (s === 'CONNECTED' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-rose-600 text-white border-rose-600') + ' shadow-lg' : 'bg-white text-slate-500 border-slate-200']">{{ s }}</button>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
          <Button :label="isEdit ? 'Simpan' : 'Tambah Integrasi'" icon="pi pi-save" class="h-11 px-8 bg-teal-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="saveForm" />
          <Button label="Batal" severity="secondary" outlined rounded @click="formDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>

    <!-- DELETE CONFIRM -->
    <div v-if="deleteDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="deleteDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-sm bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-rose-900 p-8 text-center animate-scale-in">
        <div class="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 text-3xl"><i class="pi pi-exclamation-triangle"></i></div>
        <h3 class="text-lg font-black text-slate-900 uppercase">Hapus Integrasi?</h3>
        <p class="text-[11px] text-slate-500 mt-2">Integrasi <strong>{{ selected?.name }}</strong> akan dihapus permanen.</p>
        <div class="flex gap-3 justify-center mt-6">
          <Button label="Ya, Hapus" icon="pi pi-trash" class="h-11 px-8 bg-rose-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="doDelete" />
          <Button label="Batal" severity="secondary" outlined rounded @click="deleteDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const filterType = ref('');
const viewDialog = ref(false);
const formDialog = ref(false);
const deleteDialog = ref(false);
const isEdit = ref(false);
const selected = ref<any>(null);
const form = reactive({ name: '', description: '', type: 'API', endpoint: '', apiKey: '', status: 'CONNECTED' });
let nextId = 9;

const integrations = ref([
  { id: 1, name: 'WhatsApp Business API', type: 'API', description: 'Notifikasi otomatis via WA Business', endpoint: 'https://graph.facebook.com/v18.0/messages', apiKey: 'EA*****Pg8', lastSync: '2 menit lalu', status: 'CONNECTED' },
  { id: 2, name: 'Midtrans Payment Gateway', type: 'API', description: 'Payment integration untuk invoice', endpoint: 'https://api.midtrans.com/v2', apiKey: 'SB-Mid-***', lastSync: '5 menit lalu', status: 'CONNECTED' },
  { id: 3, name: 'DJP e-Faktur API', type: 'API', description: 'Sinkronisasi faktur pajak ke DJP Online', endpoint: 'https://efaktur.pajak.go.id/api', apiKey: 'DJP-***-TOKEN', lastSync: '1 jam lalu', status: 'CONNECTED' },
  { id: 4, name: 'JNE Shipping', type: 'API', description: 'Tracking logistik pengiriman JNE', endpoint: 'https://apiv2.jne.co.id', apiKey: 'JNE-***-KEY', lastSync: '10 menit lalu', status: 'CONNECTED' },
  { id: 5, name: 'Google OAuth 2.0', type: 'OAUTH', description: 'Login dengan akun Google Workspace', endpoint: 'https://accounts.google.com/oauth/authorize', apiKey: '*.apps.googleusercontent.com', lastSync: 'Selalu Aktif', status: 'CONNECTED' },
  { id: 6, name: 'Webhook: Approval Events', type: 'WEBHOOK', description: 'Notifikasi approval ke Slack & Teams', endpoint: 'https://hooks.slack.com/services/T.../B...', apiKey: '', lastSync: '30 menit lalu', status: 'CONNECTED' },
  { id: 7, name: 'Webhook: Stock Alert', type: 'WEBHOOK', description: 'Alert stok minimum ke monitoring sistem', endpoint: 'https://your-monitoring.io/hooks/stock', apiKey: '', lastSync: '1 jam lalu', status: 'CONNECTED' },
  { id: 8, name: 'Tokopedia Marketplace', type: 'API', description: 'Sinkronisasi produk & order Tokopedia', endpoint: 'https://fs.tokopedia.net/v2', apiKey: 'TOPED-***', lastSync: '2 jam lalu', status: 'DISCONNECTED' },
]);

const filteredIntegrations = computed(() => filterType.value ? integrations.value.filter(i => i.type === filterType.value) : integrations.value);

function openView(i: any) { selected.value = i; viewDialog.value = true; }
function openCreate() { isEdit.value = false; Object.assign(form, { name: '', description: '', type: 'API', endpoint: '', apiKey: '', status: 'CONNECTED' }); formDialog.value = true; }
function openEdit(i: any) { selected.value = i; isEdit.value = true; Object.assign(form, { ...i }); formDialog.value = true; }
function confirmDelete(i: any) { selected.value = i; deleteDialog.value = true; }
function saveForm() {
  if (!form.name || !form.endpoint) { toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Nama dan Endpoint wajib diisi.', life: 3000 }); return; }
  if (isEdit.value) {
    const idx = integrations.value.findIndex(x => x.id === selected.value?.id);
    if (idx >= 0) Object.assign(integrations.value[idx], { ...form });
    toast.add({ severity: 'success', summary: 'Diperbarui', detail: `Integrasi ${form.name} diperbarui.`, life: 3000 });
  } else {
    integrations.value.push({ id: nextId++, ...form, lastSync: 'Baru ditambahkan' });
    toast.add({ severity: 'success', summary: 'Ditambahkan', detail: `Integrasi ${form.name} ditambahkan.`, life: 3000 });
  }
  formDialog.value = false;
}
function doDelete() {
  integrations.value = integrations.value.filter(x => x.id !== selected.value?.id);
  toast.add({ severity: 'warn', summary: 'Dihapus', detail: `Integrasi ${selected.value?.name} dihapus.`, life: 3000 });
  deleteDialog.value = false;
}
function testConn(i: any) { toast.add({ severity: i?.status === 'CONNECTED' ? 'success' : 'error', summary: 'Test Koneksi', detail: `${i?.name}: ${i?.status === 'CONNECTED' ? 'Terhubung berhasil!' : 'Koneksi gagal.'}`, life: 3000 }); }
function generateKey() { toast.add({ severity: 'success', summary: 'API Key', detail: 'API Key baru berhasil dibuat.', life: 3000 }); }
</script>
<style scoped>
.animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>
