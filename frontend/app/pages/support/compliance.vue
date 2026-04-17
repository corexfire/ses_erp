<template>
  <div class="min-h-screen bg-[#f8fafc]">
    
    <!-- ═══════════════════════════════════ HEADER ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 m-6 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl transition-all duration-500">
      <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Support Center</span>
           <span class="text-slate-600">/</span>
           <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Compliance Management (CMS)</span>
        </div>
        <h1 class="text-4xl font-black text-white tracking-tight mb-2 uppercase tracking-tighter">Compliance <span class="text-indigo-400 underline decoration-indigo-400/30">Registry</span></h1>
        <p class="text-slate-400 text-sm font-medium italic">Manajemen terpusat sertifikasi industrial, perizinan regulasi, dan profil resiko operasional.</p>
      </div>

      <div class="flex items-center gap-3 relative z-10">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadData" :loading="loading" class="shadow-sm border-slate-700 text-slate-300" />
        <Button label="Registrasi Kepatuhan" icon="pi pi-shield" class="p-button-rounded font-black text-[10px] uppercase shadow-lg shadow-indigo-900/20 px-6 py-3 bg-indigo-600 border-none" @click="openCreateCompliance" />
      </div>
    </div>

    <!-- Intelligence Ribbon -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mx-6 mb-8">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl text-slate-900']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ loading ? '—' : s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.badgeClass]">
               {{ s.sub }}
             </span>
          </div>
       </div>
    </div>

    <!-- ═══════════════════════════════════ REGISTRY EXPLORER ══════════════════════════════════ -->
    <div class="mx-6 mb-6">
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

        <!-- Tab Bar -->
        <div class="border-b border-slate-100 px-8 pt-6 pb-0 flex flex-col md:flex-row md:items-end gap-4">
          <div class="flex gap-6">
            <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
              :class="['pb-4 text-[11px] font-black uppercase tracking-widest transition-all border-b-4',
                activeTab === tab.key ? 'border-indigo-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700']">
              <i :class="[tab.icon, 'mr-2']"></i>{{ tab.label }}
              <span v-if="tab.count !== undefined" :class="['ml-2 px-2 py-0.5 rounded-full text-[9px] font-black', activeTab === tab.key ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400']">{{ tab.count }}</span>
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <DataTable :value="filteredCompliance" class="p-datatable-sm w-full" :loading="loading" dataKey="id">
            <Column header="RECORD CODE" class="pl-8">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <span class="text-[11px] font-black text-slate-800 font-mono tracking-tighter">{{ data.code }}</span>
                  <span class="text-[9px] font-bold text-indigo-500 uppercase tracking-widest mt-0.5">{{ data.type }}</span>
                </div>
              </template>
            </Column>
            <Column header="TITLE & CATEGORY">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <span class="text-[11px] font-bold text-slate-800 leading-tight uppercase tracking-tight">{{ data.title }}</span>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black rounded uppercase">{{ data.category }}</span>
                    <span class="text-[9px] text-slate-400 font-medium italic line-clamp-1 max-w-xs">{{ data.issuingBody || 'Internal Registry' }}</span>
                  </div>
                </div>
              </template>
            </Column>
            <Column header="RISK PROFILE">
              <template #body="{ data }">
                <div class="flex items-center gap-2">
                  <div :class="['w-2 h-2 rounded-full ring-4 ring-opacity-20', getRiskRing(data.riskLevel)]"></div>
                  <span :class="['text-[10px] font-black uppercase tracking-widest', getRiskText(data.riskLevel)]">{{ data.riskLevel }} RISK</span>
                </div>
              </template>
            </Column>
            <Column header="VALIDITY & STATUS">
              <template #body="{ data }">
                <div class="flex flex-col gap-1">
                  <span :class="['px-2.5 py-1 rounded-lg text-[9px] font-black uppercase text-center', getStatusClass(data.status)]">
                    {{ data.status.replace('_', ' ') }}
                  </span>
                  <div v-if="data.expiryDate" class="flex items-center gap-1 text-[8px] font-black justify-center">
                    <i class="pi pi-calendar-times" :class="isExpired(data.expiryDate) ? 'text-rose-500' : 'text-slate-400'"></i>
                    <span :class="isExpired(data.expiryDate) ? 'text-rose-500 underline' : 'text-slate-400'">
                      Exp: {{ formatDate(data.expiryDate) }}
                    </span>
                  </div>
                </div>
              </template>
            </Column>
            <Column class="text-right pr-8">
              <template #body="{ data }">
                <div class="flex gap-1 justify-end">
                  <Button icon="pi pi-eye" severity="secondary" rounded text @click="openEditCompliance(data)" v-tooltip="'Lihat Detail'" />
                  <Button icon="pi pi-calendar-plus" severity="secondary" rounded text v-tooltip="'Jadwalkan Audit'" />
                  <Button icon="pi pi-trash" severity="danger" rounded text @click="confirmDelete(data)" v-tooltip="'Hapus'" />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ COMPLIANCE DIALOG ══════════════════════════════════ -->
    <div v-if="complianceDialogVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-md" @click="complianceDialogVisible = false"></div>
      <div class="relative bg-white rounded-[3.5rem] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 scale-in-center border border-white/10">
        
        <!-- Header -->
        <div class="flex items-center justify-between p-12 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div class="flex items-center gap-6">
            <div class="w-20 h-20 rounded-xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-200">
              <i class="pi pi-verified text-4xl text-white"></i>
            </div>
            <div>
              <h3 class="text-3xl font-black text-slate-900 tracking-tight">{{ form.id ? 'Edit Compliance Record' : 'Registrasi Kepatuhan Baru' }}</h3>
              <p class="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 italic">Enterprise Regulatory Compliance Protocol</p>
            </div>
          </div>
          <button @click="complianceDialogVisible = false" class="w-12 h-12 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all group">
            <i class="pi pi-times text-2xl text-slate-300 group-hover:text-slate-900"></i>
          </button>
        </div>

        <div class="overflow-y-auto p-12 space-y-16 custom-scrollbar pb-40 bg-white">
          
          <!-- Basic Profile -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div class="lg:col-span-1 border-r border-slate-100 pr-12 hidden lg:block">
              <span class="text-[11px] font-black text-indigo-600 uppercase tracking-widest">Protocol 01</span>
              <h4 class="text-xl font-black text-slate-800 mt-2 leading-tight">Profil & <br/>Klasifikasi</h4>
              <p class="text-[13px] text-slate-400 font-medium mt-4 leading-relaxed tracking-tight">Identifikasi unik sertifikat atau perizinan dalam sistem ERP.</p>
            </div>
            <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              <div class="space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Unique Code</label>
                <input v-model="form.code" class="cms-input font-mono uppercase" placeholder="CMP-XXX-001" />
              </div>
              <div class="space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
                <select v-model="form.type" class="cms-select">
                  <option value="CERTIFICATION">Industrial Certification</option>
                  <option value="PERMIT">Regulatory Permit</option>
                  <option value="REGISTRATION">Official Registration</option>
                  <option value="ACCREDITATION">Accreditation</option>
                </select>
              </div>
              <div class="space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Risk Weight</label>
                <select v-model="form.riskLevel" class="cms-select font-black" :class="getRiskText(form.riskLevel)">
                  <option value="LOW">Low Risk</option>
                  <option value="MEDIUM">Medium Risk</option>
                  <option value="HIGH">High Risk</option>
                  <option value="CRITICAL">Critical Risk</option>
                </select>
              </div>
              <div class="md:col-span-3 space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Judul Resmi Sertifikat / Perizinan</label>
                <input v-model="form.title" class="cms-input font-black uppercase text-lg" placeholder="e.g., SERTIFIKAT ISO 9001:2015" />
              </div>
            </div>
          </div>

          <!-- Regulatory Context -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div class="lg:col-span-1 border-r border-slate-100 pr-12 hidden lg:block">
              <span class="text-[11px] font-black text-indigo-600 uppercase tracking-widest">Protocol 02</span>
              <h4 class="text-xl font-black text-slate-800 mt-2 leading-tight">Konteks <br/>Regulasi</h4>
              <p class="text-[13px] text-slate-400 font-medium mt-4 leading-relaxed tracking-tight">Informasi instansi penerbit dan lingkup kepatuhan.</p>
            </div>
            <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Issuing Body (Instansi Penerbit)</label>
                <input v-model="form.issuingBody" class="cms-input" placeholder="e.g., Kemenaker RI" />
              </div>
              <div class="space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Compliance Category</label>
                <select v-model="form.category" class="cms-select">
                  <option value="HSE">Health, Safety & Environment</option>
                  <option value="LEGAL">Legal & Corporate</option>
                  <option value="FINANCE">Finance & Tax</option>
                  <option value="TECHNICAL">Technical & Infrastructure</option>
                  <option value="QUALITY">Quality Management</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Lifecycle Management -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div class="lg:col-span-1 border-r border-slate-100 pr-12 hidden lg:block">
              <span class="text-[11px] font-black text-indigo-600 uppercase tracking-widest">Protocol 03</span>
              <h4 class="text-xl font-black text-slate-800 mt-2 leading-tight">Validitas & <br/>Auditing</h4>
              <p class="text-[13px] text-slate-400 font-medium mt-4 leading-relaxed tracking-tight">Timeline masa berlaku dan target audit berikutnya.</p>
            </div>
            <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Effective Date</label>
                <input v-model="form.effectiveDate" type="date" class="cms-input" />
              </div>
              <div class="space-y-3">
                <label class="text-[10px] font-black text-rose-600 uppercase tracking-widest ml-1">Expiry Date (Critical)</label>
                <input v-model="form.expiryDate" type="date" class="cms-input border-rose-100 bg-rose-50/20 text-rose-700" />
              </div>
              <div class="space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Audit Date</label>
                <input v-model="form.lastAuditDate" type="date" class="cms-input" />
              </div>
              <div class="space-y-3">
                <label class="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">Next Scheduled Audit</label>
                <input v-model="form.nextAuditDate" type="date" class="cms-input border-indigo-100 bg-indigo-50/20 text-indigo-700" />
              </div>
            </div>
          </div>

          <!-- Responsibility -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div class="lg:col-span-1 border-r border-slate-100 pr-12 hidden lg:block">
              <span class="text-[11px] font-black text-indigo-600 uppercase tracking-widest">Protocol 04</span>
              <h4 class="text-xl font-black text-slate-800 mt-2 leading-tight">Accountability</h4>
              <p class="text-[13px] text-slate-400 font-medium mt-4 leading-relaxed tracking-tight">Personil dan departemen yang bertanggung jawab penuh.</p>
            </div>
            <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
              <div class="space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Department Owner</label>
                <select v-model="form.departmentId" class="cms-select">
                  <option :value="null">-- Central Archive --</option>
                  <option v-for="d in depts" :key="d.id" :value="d.id">{{ d.name }}</option>
                </select>
              </div>
              <div class="space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Coordinating Officer</label>
                <select v-model="form.ownerId" class="cms-select">
                  <option :value="null">-- Not Assigned --</option>
                  <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.firstName }} {{ e.lastName }}</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer Actions -->
        <div class="absolute bottom-0 left-0 w-full bg-slate-50/80 backdrop-blur-2xl p-12 border-t border-slate-100 flex items-center justify-between z-10 rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
           <div class="flex items-center gap-4">
              <div class="w-2 h-10 bg-indigo-600 rounded-full"></div>
              <div>
                <p class="text-[13px] font-black text-slate-900 uppercase tracking-tighter">Enterprise Standard Enforcement</p>
                <p class="text-[10px] text-slate-400 font-bold tracking-widest">Data ini terekam dalam audit trail sistem secara permanen.</p>
              </div>
           </div>
           <div class="flex gap-5 items-center">
              <select v-model="form.status" class="bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none focus:border-indigo-600">
                <option value="ACTIVE">Status: Active</option>
                <option value="EXPIRED">Status: Expired</option>
                <option value="RENEWAL_IN_PROGRESS">Renewal Process</option>
                <option value="ARCHIVED">Archived / Legacy</option>
              </select>
              <Button label="Batalkan" severity="secondary" text @click="complianceDialogVisible = false" class="font-black text-[11px] uppercase tracking-widest" />
              <Button :label="form.id ? 'Perbarui Record' : 'Terbitkan Sertifikat'" icon="pi pi-shield" class="p-button-rounded font-black text-[11px] uppercase px-12 py-5 shadow-2xl shadow-indigo-200 bg-indigo-600 border-none" @click="saveCompliance" :loading="saving" />
           </div>
        </div>
      </div>
    </div>

    <!-- Confirm Dialog -->
    <Dialog v-model:visible="deleteVisible" header="Konfirmasi Penghapusan" :style="{width: '400px'}" :modal="true">
        <div class="flex items-center gap-4 p-4 bg-rose-50 rounded-3xl border border-rose-100">
            <i class="pi pi-exclamation-triangle text-4xl text-rose-500 shrink-0" />
            <div class="flex flex-col">
              <span class="text-sm font-black text-rose-900 uppercase tracking-tighter">Penghapusan Record Kepatuhan</span>
              <span class="text-[11px] font-medium text-rose-700 italic">Tindakan ini akan menghapus sertifikat dari registry aktif. Lanjutkan?</span>
            </div>
        </div>
        <template #footer>
            <Button label="Batal" icon="pi pi-times" severity="secondary" text @click="deleteVisible = false" class="font-bold" />
            <Button label="Hapus Permanen" icon="pi pi-check" severity="danger" class="p-button-sm rounded-xl font-bold" @click="executeDelete" :loading="saving" />
        </template>
    </Dialog>


  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import { format } from 'date-fns';
import { useToast } from 'primevue/usetoast';

const api = useApi();
const toast = useToast();

// State
const loading = ref(false);
const saving = ref(false);
const activeTab = ref('ALL');
const complianceDialogVisible = ref(false);
const deleteVisible = ref(false);
const deleteTarget = ref<any>(null);

const records = ref<any[]>([]);
const statsData = ref<any>({});
const depts = ref<any[]>([]);
const employees = ref<any[]>([]);

const form = reactive({
  id: null as any,
  code: '',
  title: '',
  type: 'CERTIFICATION',
  category: 'HSE',
  issuingBody: '',
  status: 'ACTIVE',
  riskLevel: 'MEDIUM',
  effectiveDate: '' as any,
  expiryDate: '' as any,
  lastAuditDate: '' as any,
  nextAuditDate: '' as any,
  ownerId: null as any,
  departmentId: null as any,
  description: '',
  notes: '',
});

// Computed
const tabs = computed(() => {
  const list = records.value || [];
  return [
    { key: 'ALL', label: 'Semua Kepatuhan', icon: 'pi pi-shield', count: list.length },
    { key: 'ACTIVE', label: 'Aktif & Valid', icon: 'pi pi-check-circle', count: list.filter(r => r.status === 'ACTIVE').length },
    { key: 'RENEWAL_IN_PROGRESS', label: 'Dlm Proses Renewal', icon: 'pi pi-sync', count: list.filter(r => r.status === 'RENEWAL_IN_PROGRESS').length },
    { key: 'HIGH_RISK', label: 'Profil Resiko Tinggi', icon: 'pi pi-exclamation-circle', count: list.filter(r => r.riskLevel === 'HIGH' || r.riskLevel === 'CRITICAL').length },
  ];
});

const stats = computed(() => [
  { label: 'Total Registry', value: statsData.value.total || 0, icon: 'pi pi-database', badgeClass: 'bg-indigo-50 text-indigo-600', sub: 'Certificates Locked' },
  { label: 'Status Valid', value: statsData.value.active || 0, icon: 'pi pi-verified', badgeClass: 'bg-emerald-50 text-emerald-600', sub: 'Compliance Met' },
  { label: 'Masa Renewal', value: statsData.value.expiringSoon || 0, icon: 'pi pi-clock', badgeClass: 'bg-amber-50 text-amber-600', sub: 'Action Required' },
  { label: 'Resiko Kritikal', value: statsData.value.highRisk || 0, icon: 'pi pi-exclamation-triangle', badgeClass: 'bg-rose-50 text-rose-600', sub: 'Immediate Focus' },
  { label: 'Health Score', value: '94.2%', icon: 'pi pi-chart-line', badgeClass: 'bg-slate-50 text-slate-600', sub: 'Organization-wide' },
]);

const filteredCompliance = computed(() => {
  const list = records.value || [];
  if (activeTab.value === 'ALL') return list;
  if (activeTab.value === 'HIGH_RISK') return list.filter(r => r.riskLevel === 'HIGH' || r.riskLevel === 'CRITICAL');
  return list.filter(r => r.status === activeTab.value);
});

// Implementation
async function loadData() {
  loading.value = true;
  try {
    const [res, statsRes] = await Promise.all([
      api.get('/support/compliance'),
      api.get('/support/compliance/stats'),
    ]);
    records.value = res.data || res;
    statsData.value = statsRes.data || statsRes;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'CMS Offline', detail: 'Sistem registry gagal memuat data.', life: 3000 });
  } finally {
    loading.value = false;
  }
}

async function loadMasters() {
  try {
    const [deptsRes, employeesRes] = await Promise.all([
      api.get('/hris/departments').catch(() => ({ data: [] })),
      api.get('/hris/employees'),
    ]);
    depts.value = deptsRes.data || deptsRes;
    employees.value = employeesRes.data || employeesRes;
  } catch {}
}

function openCreateCompliance() {
  Object.assign(form, {
    id: null,
    code: `CMP-${new Date().getFullYear()}-${String(Math.random()).slice(2, 6).toUpperCase()}`,
    title: '',
    type: 'CERTIFICATION',
    category: 'HSE',
    issuingBody: '',
    status: 'ACTIVE',
    riskLevel: 'MEDIUM',
    effectiveDate: '',
    expiryDate: '',
    lastAuditDate: '',
    nextAuditDate: '',
    ownerId: null,
    departmentId: null,
    description: '',
    notes: '',
  });
  loadMasters();
  complianceDialogVisible.value = true;
}

function openEditCompliance(rec: any) {
  Object.assign(form, {
    ...rec,
    effectiveDate: rec.effectiveDate?.split('T')[0] || '',
    expiryDate: rec.expiryDate?.split('T')[0] || '',
    lastAuditDate: rec.lastAuditDate?.split('T')[0] || '',
    nextAuditDate: rec.nextAuditDate?.split('T')[0] || '',
  });
  loadMasters();
  complianceDialogVisible.value = true;
}

async function saveCompliance() {
  if (!form.code || !form.title) {
    toast.add({ severity: 'warn', summary: 'Missing Input', detail: 'Kode dan Judul resmi wajib diisi.', life: 3000 });
    return;
  }
  saving.value = true;
  try {
    if (form.id) {
      await api.patch(`/support/compliance/${form.id}`, form);
      toast.add({ severity: 'success', summary: 'Update Success', detail: 'Registry kepatuhan telah diperbarui.', life: 3000 });
    } else {
      await api.post('/support/compliance', form);
      toast.add({ severity: 'success', summary: 'Registered', detail: 'Sertifikasi baru telah diterbitkan di sistem.', life: 3000 });
    }
    complianceDialogVisible.value = false;
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Engine Error', detail: e.message, life: 3000 });
  } finally {
    saving.value = false;
  }
}

function confirmDelete(rec: any) {
  deleteTarget.value = rec;
  deleteVisible.value = true;
}

async function executeDelete() {
  if (!deleteTarget.value) return;
  saving.value = true;
  try {
    await api.delete(`/support/compliance/${deleteTarget.value.id}`);
    toast.add({ severity: 'success', summary: 'Purged', detail: 'Record telah dihapus dari registry.', life: 3000 });
    deleteVisible.value = false;
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Action Failed', detail: e.message, life: 3000 });
  } finally {
    saving.value = false;
  }
}

// Helpers
function formatDate(date: string) {
  if (!date) return '-';
  return format(new Date(date), 'dd MMM yyyy');
}

function isExpired(date: string) {
  if (!date) return false;
  return new Date(date) < new Date();
}

function getRiskRing(level: string) {
  switch (level) {
    case 'CRITICAL': return 'bg-rose-500 ring-rose-500';
    case 'HIGH': return 'bg-orange-500 ring-orange-500';
    case 'MEDIUM': return 'bg-amber-500 ring-amber-500';
    default: return 'bg-emerald-500 ring-emerald-500';
  }
}

function getRiskText(level: string) {
  switch (level) {
    case 'CRITICAL': return 'text-rose-600';
    case 'HIGH': return 'text-orange-600';
    case 'MEDIUM': return 'text-amber-600';
    default: return 'text-emerald-600';
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case 'ACTIVE': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
    case 'RENEWAL_IN_PROGRESS': return 'bg-indigo-50 text-indigo-600 border border-indigo-100';
    case 'EXPIRED': return 'bg-rose-50 text-rose-600 border border-rose-100';
    case 'ARCHIVED': return 'bg-slate-100 text-slate-500 border border-slate-200';
    default: return 'bg-slate-50 text-slate-400 border border-slate-100';
  }
}

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.cms-input {
  @apply w-full px-7 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] text-[15px] font-bold text-slate-800 transition-all focus:bg-white focus:border-indigo-600 focus:outline-none placeholder:text-slate-300 shadow-sm shadow-slate-100/50;
}
.cms-select {
  @apply w-full px-7 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] text-[13px] font-black text-slate-800 transition-all focus:bg-white focus:border-indigo-600 focus:outline-none appearance-none cursor-pointer shadow-sm shadow-slate-100/50;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-100 rounded-full hover:bg-slate-200 transition-colors;
}

/* Animations */
.scale-in-center {
  animation: scale-in-center 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
@keyframes scale-in-center {
  0% { transform: scale(0.95); opacity: 0; filter: blur(10px); }
  100% { transform: scale(1); opacity: 1; filter: blur(0); }
}
</style>
