<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <DashboardHero
      title="Tax Config"
      subtitle="Registrasi kode pajak untuk otomatisasi kalkulasi PPN dan pemotongan PPh."
      category="Compliance & Regulatory"
      category-sub="Konfigurasi Pajak"
      color="amber"
    >
      <template #actions>
        <div class="flex items-center gap-3">
          <Button label="Buat Kode Pajak" icon="pi pi-shield" class="p-button-sm font-black text-xs px-6 bg-white/20 hover:bg-white/30 text-white border-white/20" @click="openNew" />
        </div>
      </template>
    </DashboardHero>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <MiniStatsCard
          v-for="s in stats"
          :key="s.label"
          :label="s.label"
          :value="s.value"
          :icon="s.icon"
          :sub="s.sub"
          :sub-color="s.theme"
          :icon-color="s.theme"
       />
    </div>

    <!-- Main Content: Table -->
    <!-- Main Content: Table -->
    <PanelCard
      title="Daftar Kode Pajak"
      subtitle="Master data tarif pajak pertambahan nilai dan pajak penghasilan."
      icon="pi pi-shield"
      theme="amber"
      :show-search="false"
      :show-refresh="false"
      flat-controls
    >
       <template #filters>
          <SelectButton 
            v-model="activeTab" 
            :options="tabOptions" 
            optionLabel="label" 
            optionValue="value" 
            :allowEmpty="false" 
            :pt="{
               root: { class: 'bg-slate-100/80 p-1 rounded-2xl border border-slate-200/50 flex gap-1 shadow-inner' },
               pcbutton: ({ context }: any) => ({
                 root: {
                   class: [
                     '!border-none !rounded-xl transition-all duration-300 px-4 py-2',
                     context.active ? '!bg-white !text-amber-600 shadow-sm' : '!bg-transparent !text-slate-500 hover:!bg-white/50'
                   ]
                 }
               })
            }"
          >
            <template #option="slotProps">
               <div class="flex items-center gap-2">
                  <i :class="[slotProps.option.icon, 'text-[10px]']"></i>
                  <span class="text-[9px] font-black uppercase tracking-[0.2em]">{{ slotProps.option.label }}</span>
               </div>
            </template>
          </SelectButton>
       </template>

       <template #table>
          <PanelTable
            :items="taxCodes"
            :columns="taxColumns"
            :loading="loading"
            hover-border-color="border-l-amber-400"
          >
            <template #col-code="{ item }">
               <span class="text-[11px] font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 font-mono italic uppercase">
                  {{ item.code }}
               </span>
            </template>
            <template #col-name="{ item }">
               <span class="text-[12px] font-black text-slate-800 uppercase tracking-tight">{{ item.name }}</span>
            </template>
            <template #col-rate="{ item }">
               <div class="w-12 py-1 bg-amber-50 text-amber-700 text-center rounded-lg text-[11px] font-black border border-amber-100 italic">
                  {{ item.rate }}%
               </div>
            </template>
            <template #col-effectiveDate="{ item }">
               <span class="text-[10px] font-bold text-slate-500 uppercase">{{ fmtDate(item.effectiveDate) }}</span>
            </template>
            <template #col-status="{ item }">
               <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', item.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100']">
                  {{ item.isActive ? 'Active' : 'Inactive' }}
               </span>
            </template>
            <template #col-actions="{ item }">
               <div class="flex gap-2 justify-end">
                  <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="item.isActive" @click="deactivate(item)" v-tooltip.top="'Deactivate Tax'" />
               </div>
            </template>
          </PanelTable>
       </template>
    </PanelCard>

    <!-- Management Dialog (Glass) -->
    <Dialog v-model:visible="dialogOpen" header="Registrasi Kode Pajak Baru" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-4 bg-amber-50 border border-amber-100 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-amber-600 shadow-sm border border-amber-100">
                <i class="pi pi-shield text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-amber-900 uppercase leading-none mb-1">Fiscal Compliance</p>
                <p class="text-[9px] font-bold text-amber-600 uppercase italic">Tentukan tarif pajak dan tanggal efektifitas peraturan.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Pajak</label>
                   <InputText v-model="form.code" class="w-full rounded-xl font-mono uppercase" placeholder="PPN-11" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tarif (%)</label>
                   <InputNumber v-model="form.rate" mode="decimal" :minFractionDigits="2" class="w-full rounded-xl" inputClass="rounded-xl w-full" placeholder="11.00" />
                </div>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Peraturan</label>
                <InputText v-model="form.name" class="w-full rounded-xl uppercase" placeholder="PPN STANDAR" />
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Efektif</label>
                <InputText v-model="form.effectiveDate" type="date" class="w-full rounded-xl" />
             </div>
          </div>
       </div>

       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="dialogOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Simpan Kode Pajak" icon="pi pi-save" class="p-button-rounded p-button-warning font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-amber-100" @click="save" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const taxCodes = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);

const form = ref<any>({
  code: '',
  name: '',
  rate: 0,
  effectiveDate: ''
});

const stats = computed(() => {
  const ppn = taxCodes.value.find(t => t.code.includes('PPN-11'))?.rate || 0;
  return [
    { label: 'Kode Pajak Aktif', value: taxCodes.value.filter(t => t.isActive).length, sub: 'Regulatory Coverage', icon: 'pi pi-shield', theme: 'emerald' as const },
    { label: 'PPN Standard', value: ppn + '%', sub: 'Fixed Rate', icon: 'pi pi-percentage', theme: 'amber' as const },
    { label: 'Pajak Non-Aktif', value: taxCodes.value.filter(t => !t.isActive).length, sub: 'Historical Rates', icon: 'pi pi-history', theme: 'slate' as const },
    { label: 'Compliance Index', value: '100%', sub: 'Verified PSAK', icon: 'pi pi-verified', theme: 'blue' as const }
  ];
});

const taxColumns = [
  { key: 'code', header: 'KODE PAJAK', width: 'w-48' },
  { key: 'name', header: 'NAMA PERATURAN / DESKRIPSI' },
  { key: 'rate', header: 'TARIF (%)', width: 'w-32', borderLeft: true },
  { key: 'effectiveDate', header: 'TANGGAL EFEKTIF', width: 'w-48', borderLeft: true },
  { key: 'status', header: 'STATUS', width: 'w-48', borderLeft: true },
  { key: 'actions', header: 'AKSI', align: 'right' as const, width: 'w-24', borderLeft: true }
];

const tabOptions = [
  { label: 'Master Pajak', value: 'master', icon: 'pi pi-shield' }
];

const activeTab = ref('master');

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/tax-codes');
    taxCodes.value = res.data?.taxCodes || res.data || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNew() {
  form.value = { code: '', name: '', rate: 0, effectiveDate: new Date().toISOString().split('T')[0] };
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    await api.post('/core/tax-codes', {
      ...form.value,
      effectiveDate: new Date(form.value.effectiveDate).toISOString()
    });
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Kode pajak berhasil didaftarkan.' });
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function deactivate(data: any) {
  try {
     await api.patch(`/core/tax-codes/${data.id}/deactivate`);
     toast.add({ severity: 'warn', summary: 'Deactivated', detail: 'Kode pajak dinonaktifkan.' });
     load();
  } catch (e) {}
}

function fmtDate(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-' }

onMounted(load);
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
