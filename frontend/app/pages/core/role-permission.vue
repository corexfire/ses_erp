<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Identity & Access</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-violet-600 uppercase tracking-widest">Role & Permission</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Access <span class="text-violet-600">Control</span></h1>
        <p class="text-slate-500 text-sm font-medium uppercase italic tracking-tight">Manajemen peran (Role) dan hak akses (Permission) berbasis RBAC.</p>
      </div>
      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadAll" :loading="loading" />
        <Button label="Buat Role Baru" icon="pi pi-plus" class="p-button-rounded font-black text-xs px-6 bg-violet-600 border-violet-600 shadow-lg shadow-violet-100" @click="openNewRole" />
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div v-for="s in stats" :key="s.label" class="group p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900 tracking-tighter">{{ s.value }}</h3>
          <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full mt-2 inline-block', s.color]">{{ s.sub }}</span>
       </div>
    </div>

    <!-- Main Content Tabs: Roles vs Permissions -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:border-violet-300 transition-all duration-500">
      <Tabs v-model:value="activeTab">
        <TabList class="px-8 pt-4 border-b border-slate-100">
          <Tab value="roles" class="group/tab flex items-center gap-2">
            <i class="pi pi-id-card text-slate-400 group-aria-selected/tab:text-violet-600"></i>
            <span class="text-[11px] font-black uppercase tracking-widest text-slate-400 group-aria-selected/tab:text-violet-600">Roles ({{ roles.length }})</span>
          </Tab>
          <Tab value="permissions" class="group/tab flex items-center gap-2">
            <i class="pi pi-lock text-slate-400 group-aria-selected/tab:text-violet-600"></i>
            <span class="text-[11px] font-black uppercase tracking-widest text-slate-400 group-aria-selected/tab:text-violet-600">Permissions ({{ permissions.length }})</span>
          </Tab>
        </TabList>

        <TabPanels>
          <!-- TAB: ROLES -->
          <TabPanel value="roles">
            <DataTable :value="roles" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
              <Column header="NAMA ROLE" class="pl-8" style="min-width:220px">
                <template #body="{ data }">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center border border-violet-200 shrink-0">
                      <i class="pi pi-id-card text-violet-600 text-sm"></i>
                    </div>
                    <span class="text-[12px] font-black text-slate-900 uppercase tracking-tight">{{ data.name }}</span>
                  </div>
                </template>
              </Column>
              <Column header="JUMLAH PERMISSIONS">
                <template #body="{ data }">
                  <div class="flex items-center gap-2">
                    <span class="text-2xl font-black text-slate-900">{{ data.permissions?.length || 0 }}</span>
                    <span class="text-[10px] font-bold text-slate-400 uppercase">permissions</span>
                  </div>
                </template>
              </Column>
              <Column header="COVERAGE">
                <template #body="{ data }">
                  <div class="flex items-center gap-2 w-40">
                    <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full bg-violet-500 rounded-full transition-all" :style="{ width: getCoverage(data) + '%' }"></div>
                    </div>
                    <span class="text-[10px] font-black text-slate-500">{{ getCoverage(data) }}%</span>
                  </div>
                </template>
              </Column>
              <Column header="DIBUAT">
                <template #body="{ data }">
                  <span class="text-[10px] font-bold text-slate-400 uppercase">{{ fmtDate(data.createdAt) }}</span>
                </template>
              </Column>
              <Column class="text-right pr-8" style="min-width:100px">
                <template #body="{ data }">
                  <Button icon="pi pi-cog" severity="secondary" text rounded size="small" @click="openManagePermissions(data)" v-tooltip.top="'Manage Permissions'" />
                </template>
              </Column>
            </DataTable>
          </TabPanel>

          <!-- TAB: PERMISSIONS -->
          <TabPanel value="permissions">
            <DataTable :value="permissions" dataKey="id" class="p-datatable-sm w-full" :loading="loading" :paginator="true" :rows="25">
              <Column header="PERMISSION KEY" class="pl-8" style="min-width:280px">
                <template #body="{ data }">
                  <span class="text-[11px] font-mono font-black text-violet-700 bg-violet-50 px-2 py-0.5 rounded-lg border border-violet-100">{{ data.key }}</span>
                </template>
              </Column>
              <Column header="MODULE" style="min-width:140px">
                <template #body="{ data }">
                  <span class="text-[10px] font-black text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">{{ data.key.split('.')[0] }}</span>
                </template>
              </Column>
              <Column field="description" header="DESKRIPSI">
                <template #body="{ data }">
                  <span class="text-[11px] text-slate-600">{{ data.description }}</span>
                </template>
              </Column>
            </DataTable>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>

    <!-- New Role Dialog -->
    <Dialog v-model:visible="newRoleDialogOpen" header="Buat Role Baru" :modal="true" :dismissableMask="false" class="w-[480px] border-none shadow-2xl glass-dialog">
      <div class="space-y-6 pt-4 px-2 pb-10">
        <div class="p-4 bg-violet-50 border border-violet-100 rounded-3xl flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-violet-600 shadow-sm border border-violet-100">
            <i class="pi pi-id-card text-xl"></i>
          </div>
          <div>
            <p class="text-[11px] font-black text-violet-900 uppercase mb-1">Access Layer</p>
            <p class="text-[9px] font-bold text-violet-500 uppercase italic">Definisikan peran baru untuk sistem kontrol akses.</p>
          </div>
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Role</label>
          <InputText v-model="newRoleName" class="w-full rounded-xl uppercase" placeholder="NAMA ROLE" />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-4 p-4 border-t bg-white">
          <Button label="Batal" severity="secondary" text @click="newRoleDialogOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
          <Button label="Buat Role" icon="pi pi-plus" class="p-button-rounded bg-violet-600 border-violet-600 font-black text-[10px] uppercase px-10 shadow-lg shadow-violet-100" @click="handleCreateRole" :loading="saving" />
        </div>
      </template>
    </Dialog>

    <!-- Manage Permissions Dialog -->
    <Dialog v-model:visible="managePermDialogOpen" :header="`Permissions: ${selectedRole?.name || ''}`" :modal="true" :dismissableMask="false" class="w-[700px] border-none shadow-2xl glass-dialog">
      <div class="pt-4 px-2 pb-8">
        <div class="grid grid-cols-2 gap-2 max-h-[500px] overflow-y-auto custom-scrollbar">
          <div v-for="p in permissions" :key="p.id"
            :class="['flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 select-none', selectedPermIds.has(p.id) ? 'bg-violet-50 border-violet-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300']"
            @click="togglePerm(p.id)">
            <div :class="['w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0', selectedPermIds.has(p.id) ? 'border-violet-500 bg-violet-500' : 'border-slate-300']">
              <i v-if="selectedPermIds.has(p.id)" class="pi pi-check text-white text-[8px]"></i>
            </div>
            <div class="min-w-0">
              <p class="text-[9px] font-black text-violet-700 font-mono truncate">{{ p.key }}</p>
              <p class="text-[8px] text-slate-400 truncate">{{ p.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between gap-4 p-4 border-t bg-white">
          <span class="text-[10px] font-black text-slate-400 uppercase">{{ selectedPermIds.size }} permissions selected</span>
          <div class="flex gap-3">
            <Button label="Tutup" severity="secondary" text @click="managePermDialogOpen = false" class="font-black text-[10px] uppercase px-6" />
            <Button label="Simpan Permissions" icon="pi pi-save" class="p-button-rounded bg-violet-600 border-violet-600 font-black text-[10px] uppercase px-10 shadow-lg shadow-violet-100" @click="handleSavePermissions" :loading="saving" />
          </div>
        </div>
      </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const roles = ref<any[]>([]);
const permissions = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const activeTab = ref('roles');

const newRoleDialogOpen = ref(false);
const managePermDialogOpen = ref(false);
const newRoleName = ref('');
const selectedRole = ref<any>(null);
const selectedPermIds = ref<Set<string>>(new Set());

const stats = computed(() => [
  { label: 'Total Roles', value: roles.value.length, sub: 'Active Profiles', icon: 'pi pi-id-card', color: 'bg-violet-50 text-violet-600' },
  { label: 'Total Permissions', value: permissions.value.length, sub: 'Granular Controls', icon: 'pi pi-lock', color: 'bg-slate-50 text-slate-600' },
  { label: 'Avg. Permissions', value: roles.value.length ? Math.round(roles.value.reduce((s, r) => s + (r.permissions?.length || 0), 0) / roles.value.length) : 0, sub: 'Per Role', icon: 'pi pi-chart-bar', color: 'bg-blue-50 text-blue-600' },
  { label: 'RBAC Status', value: 'Active', sub: 'Fully Enforced', icon: 'pi pi-shield', color: 'bg-emerald-50 text-emerald-600' }
]);

async function loadAll() {
  loading.value = true;
  try {
    const [rolesRes, permsRes] = await Promise.all([
      api.get('/core/roles'),
      api.get('/core/permissions')
    ]);
    roles.value = rolesRes.roles || rolesRes.data?.roles || [];
    permissions.value = permsRes.permissions || permsRes.data?.permissions || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNewRole() {
  newRoleName.value = '';
  newRoleDialogOpen.value = true;
}

async function handleCreateRole() {
  if (!newRoleName.value.trim()) return;
  saving.value = true;
  try {
    await api.post('/core/roles', { name: newRoleName.value.toUpperCase() });
    toast.add({ severity: 'success', summary: 'Role Created', detail: 'Role baru berhasil dibuat.' });
    newRoleDialogOpen.value = false;
    loadAll();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function openManagePermissions(role: any) {
  selectedRole.value = role;
  // Load current role permissions
  const res = await api.get(`/core/roles/${role.id}/permissions`);
  const currentPerms = res.role?.permissions?.map((rp: any) => rp.permission.id) || [];
  selectedPermIds.value = new Set(currentPerms);
  managePermDialogOpen.value = true;
}

function togglePerm(permId: string) {
  const s = new Set(selectedPermIds.value);
  if (s.has(permId)) s.delete(permId);
  else s.add(permId);
  selectedPermIds.value = s;
}

async function handleSavePermissions() {
  saving.value = true;
  try {
    await api.put(`/core/roles/${selectedRole.value.id}/permissions`, {
      permissionIds: [...selectedPermIds.value]
    });
    toast.add({ severity: 'success', summary: 'Saved', detail: 'Permissions berhasil disimpan.' });
    managePermDialogOpen.value = false;
    loadAll();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

function getCoverage(role: any) {
  if (!permissions.value.length) return 0;
  return Math.round(((role.permissions?.length || 0) / permissions.value.length) * 100);
}

function fmtDate(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-' }

onMounted(loadAll);
</script>

<style scoped lang="postcss">
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
:deep(.p-tabs-list) { background: transparent !important; }
:deep(.p-tab) { padding: 1rem 2rem !important; border: none !important; }
:deep(.p-tab-active-bar) { background: #7c3aed !important; height: 3px !important; }
:deep(.p-dialog-mask) {
  backdrop-filter: blur(8px);
  background: rgba(15, 23, 42, 0.4) !important;
}
:deep(.p-dialog) {
  border-radius: 2.5rem !important;
  border: 1px solid rgba(255,255,255,0.2) !important;
}
:deep(.p-dialog-header) { padding: 2rem 2.5rem 1rem !important; }
:deep(.p-dialog-content) { padding: 0 2.5rem 2rem !important; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-slate-200 rounded-full; }
</style>
