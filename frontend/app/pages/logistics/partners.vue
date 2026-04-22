<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Unit Eksternal</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Partner & 3PL</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Vendor <span class="text-indigo-600">Logistik</span></h1>
        <p class="text-slate-500 text-sm font-medium">Manajemen transporter pihak ketiga (3PL), kontrak kerjasama, dan armada sewa eksternal.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Tambah Partner" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-indigo-100 bg-indigo-600 border-none" @click="openNew" />
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
       <div v-for="s in stats" :key="s.label" class="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4 group hover:shadow-xl transition-all duration-300">
          <div :class="['w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-inner', s.bg]">
            <i :class="s.icon"></i>
          </div>
          <div>
            <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</div>
            <div class="text-2xl font-black text-slate-900">{{ s.value }}</div>
            <div class="text-[10px] font-bold text-slate-400 uppercase">{{ s.sub }}</div>
          </div>
       </div>
    </div>

    <!-- Partner Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
       <div v-for="p in partners" :key="p.id" class="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition relative group overflow-hidden">
          <div class="absolute right-[-20px] top-[-20px] opacity-5 group-hover:opacity-10 transition-opacity">
            <i class="pi pi-truck text-[120px] text-indigo-900"></i>
          </div>
          <div class="flex justify-between items-start mb-6">
             <div class="px-2 py-1 bg-slate-100 text-[10px] font-black text-slate-500 rounded border uppercase tracking-tighter">{{ p.code }}</div>
             <span :class="['px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border', p.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-400']">
                {{ p.isActive ? 'ACTIVE' : 'INACTIVE' }}
             </span>
          </div>
          <div class="text-lg font-black text-slate-800 mb-1">{{ p.name }}</div>
          <div class="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <i class="pi pi-user text-[10px]"></i> {{ p.contactName || 'No Contact' }}
          </div>

          <div class="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50 relative z-10">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-black">
                  {{ p._count?.vehicles || 0 }}
                </div>
                <div class="text-[9px] font-black text-slate-400 uppercase">Armada Terdaftar</div>
             </div>
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 text-xs font-black">
                  {{ p._count?.drivers || 0 }}
                </div>
                <div class="text-[9px] font-black text-slate-400 uppercase">Driver Assigned</div>
             </div>
          </div>

          <div class="mt-6 flex gap-2 invisible group-hover:visible transition-all">
             <Button label="Edit" size="small" severity="secondary" @click="edit(p)" class="flex-1 font-bold text-xs" />
             <Button icon="pi pi-external-link" size="small" outlined severity="secondary" />
          </div>
       </div>
    </div>

    <!-- Empty State -->
    <div v-if="partners.length === 0 && !loading" class="py-20 text-center text-slate-400 bg-white rounded-2xl border border-dashed">
       <i class="pi pi-users text-5xl mb-4 opacity-20 block"></i>
       <div class="font-bold italic">Belum ada partner logistik yang terdaftar.</div>
       <Button label="Daftarkan Partner Sekarang" class="mt-4 p-button-text font-black text-xs text-indigo-600" @click="openNew" />
    </div>

    <!-- Drawer Form -->
    <Drawer v-model:visible="drawerOpen" :header="editingId ? 'Update Informasi Partner' : 'Daftarkan Partner Baru'" position="right" class="w-[500px]">
       <div class="space-y-6 pt-4 px-4 overflow-y-auto pb-24 h-full custom-scrollbar">
          <div class="space-y-4">
             <div class="flex items-center gap-3 text-slate-900">
                <i class="pi pi-info-circle"></i>
                <h3 class="text-xs font-black uppercase tracking-widest">Informasi Utama</h3>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase">Nama Perusahaan / Vendor</label>
                <InputText v-model="form.name" class="w-full rounded-xl" placeholder="Contoh: PT. JNE Express / Logistik Jaya" />
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Kode Partner (Opsional)</label>
                   <InputText v-model="form.code" class="w-full rounded-xl" placeholder="TRN-XXXX" />
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-black text-slate-400 uppercase">Status Kerjasama</label>
                    <ToggleSwitch v-model="form.isActive" class="mt-2" />
                </div>
             </div>
          </div>

          <div class="space-y-4">
             <div class="flex items-center gap-3 text-slate-900">
                <i class="pi pi-phone"></i>
                <h3 class="text-xs font-black uppercase tracking-widest">Kontak & Alamat</h3>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Nama Person-In-Charge (PIC)</label>
                   <InputText v-model="form.contactName" class="w-full rounded-xl" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Email Korespondensi</label>
                   <InputText v-model="form.email" class="w-full rounded-xl" />
                </div>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase">Nomor Telepon / WhatsApp</label>
                <InputText v-model="form.phone" class="w-full rounded-xl" />
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase">Alamat Kantor / Pool</label>
                <Textarea v-model="form.address" rows="3" class="w-full rounded-xl" />
             </div>
          </div>

          <div class="space-y-1 pt-4">
             <label class="text-[10px] font-black text-slate-400 uppercase">Catatan Tambahan</label>
             <Textarea v-model="form.notes" rows="2" class="w-full rounded-xl" placeholder="Syarat kontrak, limit kredit, dll." />
          </div>

          <div class="fixed bottom-0 right-0 w-[500px] bg-white p-4 border-t flex justify-end gap-3 rounded-t-3xl shadow-2xl">
             <Button label="Batalkan" severity="secondary" text @click="drawerOpen = false" class="font-black text-[10px] uppercase" />
             <Button label="Simpan Partner" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-indigo-600 border-none" @click="save" :loading="saving" :disabled="!form.name" />
          </div>
       </div>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const api = useApi();
const toast = useToast();

const loading = ref(false);
const saving = ref(false);
const partners = ref([]);
const drawerOpen = ref(false);
const editingId = ref(null);

const form = reactive({
  code: '',
  name: '',
  contactName: '',
  phone: '',
  email: '',
  address: '',
  isActive: true,
  notes: '',
});

const stats = computed(() => {
  const total = partners.value.length;
  const active = partners.value.filter(p => p.isActive).length;
  const totalFleet = partners.value.reduce((acc, p) => acc + (p._count?.vehicles || 0), 0);

  return [
    { label: 'Total Partner', value: total, icon: 'pi pi-address-book', bg: 'bg-indigo-50 text-indigo-600', sub: 'Terdaftar di Sistem' },
    { label: 'Partner Aktif', value: active, icon: 'pi pi-check-circle', bg: 'bg-emerald-50 text-emerald-600', sub: 'Kerjasama Berjalan' },
    { label: 'Armada Konsolidasi', value: totalFleet, icon: 'pi pi-map', bg: 'bg-amber-50 text-amber-600', sub: 'Unit Sewa/3PL' },
  ];
});

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/logistics/transporters');
    partners.value = res.data.transporters;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNew() {
  editingId.value = null;
  Object.assign(form, { code: '', name: '', contactName: '', phone: '', email: '', address: '', isActive: true, notes: '' });
  drawerOpen.value = true;
}

function edit(p: any) {
  editingId.value = p.id;
  Object.assign(form, { ...p });
  drawerOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    if (editingId.value) {
      await api.patch(`/logistics/transporters/${editingId.value}`, form);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Partner diperbarui.' });
    } else {
      await api.post('/logistics/transporters', form);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Partner baru terdaftar.' });
    }
    drawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

onMounted(load);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 10px;
}
</style>
