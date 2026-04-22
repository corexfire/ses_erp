<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Manajemen Proyek</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Kolaborasi & Tim</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase">Project <span class="text-indigo-600">Teams</span></h1>
        <p class="text-slate-500 text-sm font-medium italic">Kelola struktur tim, anggota, dan koordinasi kerja lintas departemen.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="bg-slate-100 p-1 rounded-2xl border border-slate-200 flex gap-1 mr-4">
           <Button icon="pi pi-th-large" text :severity="viewMode === 'card' ? 'primary' : 'secondary'" @click="viewMode = 'card'" class="w-10 h-10 rounded-xl" :class="viewMode === 'card' ? 'bg-white shadow-sm' : ''" />
           <Button icon="pi pi-list" text :severity="viewMode === 'grid' ? 'primary' : 'secondary'" @click="viewMode = 'grid'" class="w-10 h-10 rounded-xl" :class="viewMode === 'grid' ? 'bg-white shadow-sm' : ''" />
        </div>
        
        <div class="flex flex-col items-end mr-4">
           <span class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Cari Tim</span>
           <InputText v-model="search" placeholder="..." class="p-inputtext-sm border-none bg-transparent text-right font-black w-32 uppercase" />
        </div>
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Buat Tim Baru" icon="pi pi-plus" class="p-button-rounded p-button-indigo font-black text-xs shadow-lg shadow-indigo-100" @click="openCreate" />
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div v-for="s in stats" :key="s.label" class="group p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900 leading-none">{{ s.value }}</h3>
          <p class="text-[9px] font-bold text-slate-400 mt-2 uppercase">{{ s.description }}</p>
       </div>
    </div>

    <!-- MAIN VIEW AREA -->
    <div v-if="viewMode === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
       <div v-for="team in filteredTeams" :key="team.id" class="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 overflow-hidden flex flex-col">
          <!-- Card Header -->
          <div class="p-8 pb-6 relative">
             <div class="flex items-center justify-between mb-6">
                <div class="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-500">
                   <i class="pi pi-users text-2xl text-slate-400 group-hover:text-white transition-colors duration-500"></i>
                </div>
                <div class="flex gap-2">
                   <Button icon="pi pi-pencil" text rounded severity="secondary" @click="editTeam(team)" />
                   <Button icon="pi pi-trash" text rounded severity="danger" @click="confirmDelete(team)" />
                </div>
             </div>
             <h3 class="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-none mb-2">{{ team.name }}</h3>
             <p class="text-xs text-slate-400 font-medium line-clamp-2 h-8 uppercase">{{ team.description || 'Tidak ada deskripsi tim.' }}</p>
          </div>

          <!-- Card Content / Members -->
          <div class="px-8 pb-8 flex-1">
             <div class="flex items-center gap-2 mb-4">
                <span class="text-[10px] font-black text-slate-900 uppercase">Anggota</span>
                <div class="h-[1px] bg-slate-100 flex-1"></div>
                <span class="text-[10px] font-black text-indigo-600">{{ team.members?.length || 0 }} Personel</span>
             </div>
             
             <div class="flex flex-wrap gap-2 mb-6 min-h-[40px]">
                <Avatar v-for="m in team.members?.slice(0, 5)" :key="m.id" :label="getInitials(m.user?.name)" shape="circle" class="border-2 border-white shadow-sm bg-slate-50 text-[9px] font-black" v-tooltip="m.user?.name" />
                <Avatar v-if="team.members?.length > 5" :label="`+${team.members.length - 5}`" shape="circle" class="border-2 border-white shadow-sm bg-indigo-50 text-indigo-600 text-[9px] font-black" />
             </div>

             <div class="grid grid-cols-2 gap-3 pt-6 border-t border-slate-50">
                <div class="flex flex-col">
                   <span class="text-[9px] font-black text-slate-400 uppercase">Dibuat Pada</span>
                   <span class="text-xs font-bold text-slate-700 uppercase leading-none mt-1">{{ formatDate(team.createdAt) }}</span>
                </div>
                <Button label="Kelola Anggota" icon="pi pi-cog" text class="text-[9px] font-black uppercase p-0 h-auto justify-end text-indigo-600 hover:scale-105 transition-all" @click="manageMembers(team)" />
             </div>
          </div>
       </div>
    </div>

    <!-- GRID VIEW AREA -->
    <div v-else class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <DataTable :value="filteredTeams" dataKey="id" :loading="loading" class="p-datatable-sm w-full">
           <Column field="name" header="NAMA TIM" class="pl-8 uppercase font-black text-xs text-slate-800"></Column>
           <Column field="description" header="DESKRIPSI" class="text-xs font-medium text-slate-400 uppercase"></Column>
           <Column header="ANGGOTA" class="text-center">
              <template #body="{ data }">
                 <span class="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-600">{{ data.members?.length || 0 }}</span>
              </template>
           </Column>
           <Column field="createdAt" header="TANGGAL BUAT">
              <template #body="{ data }">
                 <span class="text-[10px] font-bold text-slate-500 uppercase">{{ formatDate(data.createdAt) }}</span>
              </template>
           </Column>
           <Column class="text-right pr-8">
              <template #body="{ data }">
                 <div class="flex gap-2 justify-end">
                    <Button icon="pi pi-users" severity="indigo" rounded text @click="manageMembers(data)" />
                    <Button icon="pi pi-pencil" severity="secondary" rounded text @click="editTeam(data)" />
                    <Button icon="pi pi-trash" severity="danger" rounded text @click="confirmDelete(data)" />
                 </div>
              </template>
           </Column>
        </DataTable>
    </div>

    <!-- TEAM DRAWER (Create/Edit Team) -->
    <Drawer v-model:visible="drawerOpen" :header="editingTeam ? 'Edit Squad Tim' : 'Mulai Squad Baru'" position="right" class="w-[500px] border-l border-slate-200">
       <div class="space-y-10 p-8">
          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-indigo-900 flex items-center justify-center text-white text-xs shadow-lg shadow-indigo-100">1</div>
                <h2 class="text-[12px] font-black uppercase tracking-widest text-slate-900 underline decoration-indigo-200 decoration-4">Informasi Identitas</h2>
             </div>
             
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nama Squad / Tim <span class="text-indigo-600">*</span></label>
                <InputText v-model="form.name" class="w-full p-4 rounded-3xl bg-slate-50/50 border-slate-200 focus:bg-white transition-all text-sm font-bold uppercase" placeholder="MISAL: SQUAD ENGINEERING.." />
             </div>

             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Deskripsi Operasional</label>
                <Textarea v-model="form.description" rows="4" class="w-full p-4 rounded-3xl bg-slate-50/50 border-slate-200 focus:bg-white transition-all text-sm font-bold uppercase" placeholder="Tujuan dan ruang lingkup tim ini.." />
             </div>
          </div>

          <div class="pt-10 border-t border-slate-100 flex justify-end gap-3">
             <Button label="Batalkan" severity="secondary" text @click="drawerOpen = false" class="font-black text-[10px] uppercase" />
             <Button label="Simpan Squad" icon="pi pi-check" class="p-button-rounded p-button-indigo font-black text-[10px] uppercase px-12 shadow-xl shadow-indigo-50" @click="saveTeam" :loading="saving" />
          </div>
       </div>
    </Drawer>

    <!-- MEMBER MANAGEMENT DIALOG -->
    <Dialog v-model:visible="memberDialogOpen" :header="`Manage Members: ${activeTeam?.name}`" modal class="w-[700px] p-fluid rounded-xl overflow-hidden">
       <div class="space-y-8 p-4">
          <!-- Add New Member -->
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
             <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Tambah Anggota dari Database Employee</h4>
             <div class="flex gap-4 items-end">
                <div class="flex-1 space-y-1">
                   <label class="text-[9px] font-black text-slate-400 uppercase ml-1">Pilih Employee</label>
                   <Select v-model="selectedEmployeeId" :options="employees" optionLabel="firstName" optionValue="id" placeholder="PILIH PERSONEL.." class="rounded-2xl" filter>
                      <template #option="{ option }">
                        <div class="flex items-center gap-2">
                           <Avatar :label="getInitials(option.firstName)" shape="circle" size="small" />
                           <div class="flex flex-col">
                              <span class="text-[11px] font-bold uppercase">{{ option.firstName }} {{ option.lastName }}</span>
                              <span class="text-[9px] text-slate-400 uppercase">{{ option.position }} - {{ option.department }}</span>
                           </div>
                        </div>
                      </template>
                   </Select>
                </div>
                <div class="w-40 space-y-1">
                   <label class="text-[9px] font-black text-slate-400 uppercase ml-1">Role Tim</label>
                   <Select v-model="memberRole" :options="['MEMBER', 'LEAD', 'REVIEWER', 'GUEST']" placeholder="ROLE" class="rounded-2xl" />
                </div>
                <Button icon="pi pi-plus" class="w-12 h-12 rounded-2xl p-button-indigo shadow-lg shadow-indigo-100" @click="addMember" :loading="addingMember" />
             </div>
          </div>

          <!-- Current Member List -->
          <div class="space-y-4">
             <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Daftar Anggota Saat Ini</h4>
             <DataTable :value="activeTeam?.members" size="small" scrollable scrollHeight="300px">
                <Column header="PERSONEL">
                   <template #body="{ data }">
                      <div class="flex items-center gap-3">
                         <Avatar :label="getInitials(data.user?.name)" shape="circle" class="bg-indigo-50 text-indigo-600 font-black" />
                         <span class="text-xs font-bold uppercase text-slate-700">{{ data.user?.name }}</span>
                      </div>
                   </template>
                </Column>
                <Column field="role" header="ROLE">
                   <template #body="{ data }">
                      <span class="px-2 py-0.5 bg-slate-100 text-[9px] font-black text-slate-600 rounded uppercase">{{ data.role }}</span>
                   </template>
                </Column>
                <Column class="text-right">
                   <template #body="{ data }">
                      <Button icon="pi pi-times" severity="danger" text rounded @click="removeMember(data)" />
                   </template>
                </Column>
             </DataTable>
          </div>
       </div>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useApi } from '@/composables/useApi';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { format } from 'date-fns';

const api = useApi();
const toast = useToast();
const confirm = useConfirm();

const teams = ref<any[]>([]);
const employees = ref<any[]>([]);
const users = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const viewMode = ref('card');
const search = ref('');
const drawerOpen = ref(false);
const editingTeam = ref<any>(null);
const memberDialogOpen = ref(false);
const activeTeam = ref<any>(null);

// Member addition form
const selectedEmployeeId = ref(null);
const memberRole = ref('MEMBER');
const addingMember = ref(false);

const form = reactive({
  name: '',
  description: ''
});

const stats = computed(() => [
  { label: 'Total Squad', value: teams.value.length, icon: 'pi pi-users', description: 'Jumlah tim aktif', iconColor: 'text-indigo-600' },
  { label: 'Total Anggota', value: teams.value.reduce((s,t) => s + (t.members?.length || 0), 0), icon: 'pi pi-user', description: 'Personel teralokasi', iconColor: 'text-emerald-600' },
  { label: 'Tim Terbesar', value: teams.value.length ? Math.max(...teams.value.map(t => t.members?.length || 0)) : 0, icon: 'pi pi-chart-pie', description: 'Kapasitas maksimal tim', iconColor: 'text-amber-600' },
  { label: 'Squad Tanpa Anggota', value: teams.value.filter(t => !t.members?.length).length, icon: 'pi pi-exclamation-triangle', description: 'Perlu alokasi tim', iconColor: 'text-rose-600' }
]);

const filteredTeams = computed(() => {
  if (!search.value) return teams.value;
  const s = search.value.toLowerCase();
  return teams.value.filter(t => t.name.toLowerCase().includes(s) || t.description?.toLowerCase().includes(s));
});

async function load() {
  loading.value = true;
  try {
    const [teamRes, empRes, userRes] = await Promise.all([
      api.get('/hris/team'),
      api.get('/hris/employees'),
      api.get('/core/users')
    ]);
    teams.value = teamRes.data?.data || [];
    employees.value = empRes.data?.employees || [];
    users.value = userRes.data?.data || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Gagal', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  editingTeam.value = null;
  form.name = '';
  form.description = '';
  drawerOpen.value = true;
}

function editTeam(team: any) {
  editingTeam.value = team;
  form.name = team.name;
  form.description = team.description;
  drawerOpen.value = true;
}

async function saveTeam() {
  if (!form.name) {
    return toast.add({ severity: 'warn', summary: 'Data Kurang', detail: 'Nama tim wajib diisi' });
  }
  saving.value = true;
  try {
    if (editingTeam.value) {
      await api.patch(`/hris/team/${editingTeam.value.id}`, form);
      toast.add({ severity: 'success', summary: 'Squad Diperbarui', detail: 'Informasi tim telah disimpan' });
    } else {
      await api.post('/hris/team', form);
      toast.add({ severity: 'success', summary: 'Squad Baru', detail: 'Tim operasional telah dibuat' });
    }
    drawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function confirmDelete(team: any) {
  confirm.require({
    message: `Apakah Anda yakin ingin menghapus squad "${team.name}"?`,
    header: 'Konfirmasi Penghapusan',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-text',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await api.delete(`/hris/team/${team.id}`);
        toast.add({ severity: 'success', summary: 'Squad Dihapus', detail: 'Tim telah dihapus dari sistem' });
        load();
      } catch (e: any) {
        toast.add({ severity: 'error', summary: 'Hapus Gagal', detail: e.message });
      }
    }
  });
}

function manageMembers(team: any) {
  activeTeam.value = team;
  memberDialogOpen.value = true;
}

async function addMember() {
  if (!selectedEmployeeId.value || !activeTeam.value) return;
  addingMember.value = true;
  try {
    const emp = employees.value.find(e => e.id === selectedEmployeeId.value);
    if (!emp) throw new Error('Employee tidak ditemukan');
    
    // Find matching user by email
    const matchedUser = users.value.find(u => u.email === emp.email);
    if (!matchedUser) {
        throw new Error(`Email ${emp.email} tidak terdaftar sebagai User. Buat user terlebih dahulu.`);
    }

    await api.post(`/hris/team/${activeTeam.value.id}/members`, {
      userId: matchedUser.id,
      role: memberRole.value
    });

    toast.add({ severity: 'success', summary: 'Anggota Ditambah', detail: 'Personel telah bergabung ke squad' });
    selectedEmployeeId.value = null;
    load();
    // Re-assign activeTeam to update UI
    const updated = teams.value.find(t => t.id === activeTeam.value.id);
    if (updated) activeTeam.value = updated;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Menambah', detail: e.message });
  } finally {
    addingMember.value = false;
  }
}

async function removeMember(member: any) {
  try {
    await api.delete(`/hris/team/${activeTeam.value.id}/members/${member.id}`);
    toast.add({ severity: 'info', summary: 'Anggota Dihapus', detail: 'Personel telah dikeluarkan dari squad' });
    load();
    const updated = teams.value.find(t => t.id === activeTeam.value.id);
    if (updated) activeTeam.value = updated;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Hapus', detail: e.message });
  }
}

function getInitials(name: string) {
  return name ? name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : '??';
}

function formatDate(d: string) {
  if (!d) return '-';
  return format(new Date(d), 'dd MMM yyyy');
}

onMounted(load);
</script>

<style scoped lang="postcss">
.p-button-indigo { @apply bg-indigo-900 border-indigo-900 text-white hover:bg-slate-900; }
:deep(.p-datatable-header) { background: transparent !important; }
:deep(.p-avatar) { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
</style>
