<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Identity & Access</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Manajemen Pengguna</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">User <span class="text-emerald-600">Management</span></h1>
        <p class="text-slate-500 text-sm font-medium uppercase italic tracking-tight italic">Otorisasi dan manajemen identitas tenaga kerja lintas departemen.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Registrasi Staff" icon="pi pi-user-plus" class="p-button-rounded p-button-success font-black text-xs shadow-lg shadow-emerald-100 px-6" @click="openNew" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900 tracking-tighter">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main Content: Table -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-emerald-300 transition-all duration-500 text-[11px]">
       <DataTable :value="users" dataKey="id" class="p-datatable-sm w-full" :loading="loading" scrollable scrollHeight="800px">
          <Column header="IDENTITAS STAFF" class="pl-8" style="min-width: 250px">
             <template #body="{ data }">
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm group-hover:scale-105 transition-transform">
                      <span class="text-[11px] font-black text-slate-600 uppercase">{{ getInitials(data.name) }}</span>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[12px] font-black text-slate-900 uppercase tracking-tight">{{ data.name || 'ANONYMOUS' }}</span>
                      <span class="text-[10px] font-bold text-slate-400 font-mono italic lowercase tracking-tighter opacity-70">{{ data.id }}</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column field="email" header="EMAIL" style="min-width: 200px">
             <template #body="{ data }">
                <span class="text-[11px] font-bold text-slate-600 font-mono italic">{{ data.email }}</span>
             </template>
          </Column>
          <Column header="HAK AKSES / ROLES" style="min-width: 200px">
             <template #body="{ data }">
                <div class="flex flex-wrap gap-1">
                   <div v-for="r in data.roles" :key="r.role.id" class="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-black uppercase rounded-lg border border-slate-200 group/role">
                      <span>{{ r.role.name }}</span>
                      <i class="pi pi-times text-[7px] cursor-pointer hover:text-rose-500 opacity-0 group-hover/role:opacity-100 transition-opacity" @click="handleRemoveRole(data, r.role.id)"></i>
                   </div>
                   <span v-if="!data.roles?.length" class="text-[9px] font-bold text-slate-300 uppercase">No roles assigned</span>
                </div>
             </template>
          </Column>
          <Column header="TANGGAL BERGABUNG" style="min-width: 150px">
             <template #body="{ data }">
                <span class="text-[10px] font-bold text-slate-500 uppercase">{{ fmtDate(data.createdAt) }}</span>
             </template>
          </Column>
          <Column header="STATUS" style="min-width: 120px">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', data.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100']">
                   {{ data.isActive ? 'Active' : 'Deactivated' }}
                </span>
             </template>
          </Column>
          <Column class="text-right pr-8" style="min-width: 180px">
             <template #body="{ data }">
                <div class="flex items-center justify-end gap-1">
                  <Button icon="pi pi-pencil" severity="secondary" text rounded size="small" v-tooltip.top="'Edit Profile'" @click="openEdit(data)" />
                  <Button icon="pi pi-key" severity="info" text rounded size="small" v-tooltip.top="'Assign Roles'" @click="openRoles(data)" />
                  <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="data.isActive" @click="deactivate(data)" v-tooltip.top="'Deactivate Account'" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Registration Dialog (Glass) -->
    <Dialog v-model:visible="registerDialogOpen" header="Registrasi Pengguna Baru" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                <i class="pi pi-user-plus text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-emerald-900 uppercase leading-none mb-1">Empower Workforce</p>
                <p class="text-[9px] font-bold text-emerald-600 uppercase italic">Daftarkan staff baru untuk mengakses modul operasional ERP.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Lengkap Staff</label>
                <InputText v-model="form.name" class="w-full rounded-xl uppercase" placeholder="Nama Lengkap" />
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alamat Email (Login ID)</label>
                <InputText v-model="form.email" class="w-full rounded-xl italic font-mono" placeholder="email@company.local" />
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password Default</label>
                <Password v-model="form.password" class="w-full" inputClass="w-full rounded-xl" toggleMask :feedback="false" />
             </div>
          </div>
       </div>

       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="registerDialogOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Registrasi Akun" icon="pi pi-check-circle" class="p-button-rounded p-button-success font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-emerald-100" @click="handleSave" :loading="saving" />
          </div>
       </template>
    </Dialog>

    <!-- Edit Dialog (Glass) -->
    <Dialog v-model:visible="editDialogOpen" header="Perbarui Profil Pengguna" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-6 bg-slate-50 border border-slate-200 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-600 shadow-sm border border-slate-200">
                <i class="pi pi-user-edit text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-slate-900 uppercase leading-none mb-1">Update Identity</p>
                <p class="text-[9px] font-bold text-slate-400 uppercase italic">Perbarui informasi dasar profil staf.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Lengkap Staff</label>
                <InputText v-model="form.name" class="w-full rounded-xl uppercase" placeholder="Nama Lengkap" />
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alamat Email</label>
                <InputText v-model="form.email" class="w-full rounded-xl italic font-mono" placeholder="email@company.local" />
             </div>
          </div>
       </div>

       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="editDialogOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Perbarui Data" icon="pi pi-save" class="p-button-rounded p-button-secondary font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-slate-100" @click="handleUpdate" :loading="saving" />
          </div>
       </template>
    </Dialog>

    <!-- Assign Role Dialog (Glass) -->
    <Dialog v-model:visible="roleDialogOpen" header="Pengaturan Hak Akses" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-6 bg-blue-50 border border-blue-100 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                <i class="pi pi-key text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-blue-900 uppercase leading-none mb-1">Access Control List</p>
                <p class="text-[9px] font-bold text-blue-600 uppercase italic">Tentukan peran dan batasan akses modul untuk staf ini.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pilih Role Baru</label>
                <Select v-model="selectedRoleId" :options="availableRoles" optionLabel="name" optionValue="id" placeholder="CARI & PILIH ROLE" class="w-full rounded-xl" filter>
                  <template #option="{ option }">
                    <span class="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{{ option.name }}</span>
                  </template>
                </Select>
             </div>

             <div class="space-y-3 pt-4 border-t border-slate-100">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Roles</p>
                <div class="flex flex-wrap gap-2">
                   <div v-for="r in currentAssignedRoles" :key="r.role.id" class="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 text-[10px] font-black uppercase rounded-xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-0.5">
                      <span>{{ r.role.name }}</span>
                      <i class="pi pi-trash text-[8px] cursor-pointer text-rose-400 hover:text-rose-600" @click="handleRemoveRole(targetUserForRoles, r.role.id)"></i>
                   </div>
                   <p v-if="!currentAssignedRoles?.length" class="text-[10px] text-slate-300 italic">No roles currently assigned.</p>
                </div>
             </div>
          </div>
       </div>

       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Tutup" severity="secondary" text @click="roleDialogOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Tambahkan Role" icon="pi pi-plus-circle" class="p-button-rounded p-button-info font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-blue-100" @click="handleAssignRole" :loading="saving" :disabled="!selectedRoleId" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const users = ref<any[]>([]);
const availableRoles = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);

const registerDialogOpen = ref(false);
const editDialogOpen = ref(false);
const roleDialogOpen = ref(false);

const targetUser = ref<any>(null);
const targetUserForRoles = ref<any>(null);
const selectedRoleId = ref<string | null>(null);

const form = ref<any>({
  name: '',
  email: '',
  password: 'password123'
});

const currentAssignedRoles = computed(() => targetUserForRoles.value?.roles || []);

const stats = computed(() => [
  { label: 'Total Pengguna', value: users.value.length, sub: 'Registered Accounts', icon: 'pi pi-users', color: 'bg-slate-50 text-slate-600' },
  { label: 'Staff Aktif', value: users.value.filter(u => u.isActive).length, sub: 'Productive Identity', icon: 'pi pi-check-circle', color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Akun Non-Aktif', value: users.value.filter(u => !u.isActive).length, sub: 'Historical Staff', icon: 'pi pi-lock', color: 'bg-rose-50 text-rose-600' },
  { label: 'Authentication', value: 'Live', sub: 'Oauth / Local Secure', icon: 'pi pi-shield', color: 'bg-blue-50 text-blue-600' }
]);

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/users');
    users.value = res.users || res.data?.users || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

async function loadRoles() {
  try {
    const res = await api.get('/core/roles');
    availableRoles.value = res.roles || res.data?.roles || [];
  } catch (e) {}
}

function openNew() {
  form.value = { name: '', email: '', password: 'password123' };
  registerDialogOpen.value = true;
}

function openEdit(data: any) {
  targetUser.value = data;
  form.value = { name: data.name, email: data.email };
  editDialogOpen.value = true;
}

function openRoles(data: any) {
  targetUserForRoles.value = data;
  selectedRoleId.value = null;
  roleDialogOpen.value = true;
  loadRoles();
}

async function handleSave() {
  saving.value = true;
  try {
    await api.post('/core/users', form.value);
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Pengguna berhasil didaftarkan.' });
    registerDialogOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message || 'Error occurred' });
  } finally {
    saving.value = false;
  }
}

async function handleUpdate() {
  saving.value = true;
  try {
    await api.put(`/core/users/${targetUser.value.id}`, form.value);
    toast.add({ severity: 'success', summary: 'Updated', detail: 'Profil pengguna berhasil diperbarui.' });
    editDialogOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message || 'Update failed' });
  } finally {
    saving.value = false;
  }
}

async function handleAssignRole() {
  if (!selectedRoleId.value) return;
  saving.value = true;
  try {
    await api.post(`/core/users/${targetUserForRoles.value.id}/roles`, { roleId: selectedRoleId.value });
    toast.add({ severity: 'success', summary: 'Role Assigned', detail: 'Hak akses berhasil ditambahkan.' });
    // Refresh targeted user data
    const refreshRes = await api.get('/core/users');
    const updatedUsers = refreshRes.users || refreshRes.data?.users || [];
    users.value = updatedUsers;
    targetUserForRoles.value = updatedUsers.find((u: any) => u.id === targetUserForRoles.value.id);
    selectedRoleId.value = null;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function handleRemoveRole(user: any, roleId: string) {
  try {
    await api.delete(`/core/users/${user.id}/roles/${roleId}`);
    toast.add({ severity: 'warn', summary: 'Role Revoked', detail: 'Hak akses telah dihapus.' });
    const refreshRes = await api.get('/core/users');
    const updatedUsers = refreshRes.users || refreshRes.data?.users || [];
    users.value = updatedUsers;
    if (targetUserForRoles.value?.id === user.id) {
       targetUserForRoles.value = updatedUsers.find((u: any) => u.id === user.id);
    }
  } catch (e) {}
}

async function deactivate(data: any) {
  try {
     await api.patch(`/core/users/${data.id}/deactivate`);
     toast.add({ severity: 'warn', summary: 'Deactivated', detail: 'Akun pengguna dinonaktifkan.' });
     load();
  } catch (e) {}
}

function fmtDate(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-' }
function getInitials(name: string) { return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2) : '?' }

onMounted(load);
</script>

<style scoped>
:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1rem !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-dialog-mask) {
  backdrop-filter: blur(8px);
  background: rgba(15, 23, 42, 0.4) !important;
}

:deep(.p-dialog) {
  border-radius: 2.5rem !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-dialog-header) { padding: 2rem 2.5rem 1rem !important; }
:deep(.p-dialog-content) { padding: 0 2.5rem 2rem !important; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-slate-200 rounded-full; }
</style>
