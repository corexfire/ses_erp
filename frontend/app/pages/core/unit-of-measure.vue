<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <DashboardHero
      title="Unit Of Measure"
      subtitle="Standarisasi satuan hitung, berat, dan volume beserta aturan konversi antar satuan."
      category="Inventory Standards"
      category-sub="Satuan Ukur (UOM)"
      color="emerald"
    >
      <template #actions>
        <div class="flex items-center gap-3">
          <Button label="Registrasi UOM" icon="pi pi-plus" class="p-button-sm font-black text-xs px-6 bg-white/20 hover:bg-white/30 text-white border-white/20" @click="openNewUom" />
        </div>
      </template>
    </DashboardHero>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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

    <!-- Main Content with Tabs -->
    <!-- Main Content with Tabs -->
    <PanelCard
      :title="activeTab === 'master' ? 'Master Satuan Ukur' : 'Aturan Scaling Factor'"
      subtitle="Dataset standarisasi satuan dan rasio konversi inventori."
      icon="pi pi-box"
      theme="emerald"
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
                     context.active ? '!bg-white !text-emerald-600 shadow-sm' : '!bg-transparent !text-slate-500 hover:!bg-white/50'
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
          <!-- VIEW: MASTER UOM LIST -->
          <PanelTable
            v-if="activeTab === 'master'"
            :items="uoms"
            :columns="uomColumns"
            :loading="loading"
            hover-border-color="border-l-emerald-400"
          >
            <template #col-code="{ item }">
               <span class="text-[11px] font-black text-slate-900 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 font-mono italic">
                  {{ item.code }}
               </span>
            </template>
            <template #col-name="{ item }">
               <span class="text-[12px] font-black text-slate-800 uppercase tracking-tight">{{ item.name }}</span>
            </template>
            <template #col-status="{ item }">
               <div class="py-2">
                  <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', item.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400']">
                     {{ item.isActive ? 'Active' : 'Disabled' }}
                  </span>
               </div>
            </template>
            <template #col-actions="{ item }">
               <div class="flex gap-2 justify-end">
                  <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="item.isActive" @click="deactivateUom(item)" />
               </div>
            </template>
          </PanelTable>

          <!-- VIEW: CONVERSION RULES -->
          <div v-else>
             <div class="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                <h3 class="text-[9px] font-black uppercase tracking-widest text-slate-400">Rasio Kalkulasi Stok & Inventory scaling</h3>
                <Button label="Aturan Baru" icon="pi pi-plus" size="small" text @click="openNewConversion" class="font-black text-[10px] uppercase tracking-widest" />
             </div>
             <PanelTable
               :items="conversions"
               :columns="convColumns"
               :loading="loading"
               hover-border-color="border-l-blue-400"
             >
                <template #col-from="{ item }">
                   <span class="text-[11px] font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 font-mono italic">{{ item.fromUom?.code }}</span>
                </template>
                <template #col-factor="{ item }">
                   <div class="flex items-center justify-center gap-3">
                      <i class="pi pi-arrow-right text-[10px] text-emerald-400"></i>
                      <span class="text-[13px] font-black text-slate-900 italic font-mono">x {{ item.factor }}</span>
                      <i class="pi pi-arrow-right text-[10px] text-emerald-400"></i>
                   </div>
                </template>
                <template #col-to="{ item }">
                   <span class="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 font-mono italic">{{ item.toUom?.code }}</span>
                </template>
                <template #col-actions="{ item }">
                   <Button icon="pi pi-trash" severity="danger" text rounded size="small" @click="deleteConversion(item)" />
                </template>
             </PanelTable>
          </div>
       </template>
    </PanelCard>

    <!-- UOM Entry Dialog -->
    <Dialog v-model:visible="uomDrawerOpen" header="Registrasi Satuan Baru" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                <i class="pi pi-box text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-emerald-900 uppercase leading-none mb-1">UOM Registry</p>
                <p class="text-[9px] font-bold text-emerald-600 uppercase italic">Tambahkan satuan ukur dasar untuk katalog barang.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Satuan (UOM Code)</label>
                <InputText v-model="uomForm.code" class="w-full rounded-2xl border-slate-200 font-mono uppercase" placeholder="PCS / BOX / KG" />
             </div>
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Satuan Lengkap</label>
                <InputText v-model="uomForm.name" class="w-full rounded-2xl border-slate-200" placeholder="Contoh: Pieces / Kotak / Kilogram" />
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="uomDrawerOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Simpan Satuan" icon="pi pi-save" class="p-button-rounded p-button-success font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-emerald-100" @click="saveUom" :loading="saving" />
          </div>
       </template>
    </Dialog>

    <!-- Conversion Entry Dialog -->
    <Dialog v-model:visible="convDrawerOpen" header="Setup Aturan Konversi" :modal="true" :dismissableMask="false" class="w-[540px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-8 bg-slate-900 rounded-xl text-white space-y-4">
             <p class="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Formula Kalkulasi Stock</p>
             <div class="flex items-center justify-between gap-4 py-4">
                <div class="flex-1 flex flex-col items-center">
                   <span class="text-[10px] font-black text-slate-500 mb-2 uppercase">Input</span>
                   <div class="w-full h-12 rounded-xl bg-white/5 flex items-center justify-center font-black text-lg border border-white/10 uppercase">
                      {{ uoms.find(u => u.id === convForm.fromUomId)?.code || '???' }}
                   </div>
                </div>
                <div class="pt-6">
                   <i class="pi pi-times text-emerald-400"></i>
                </div>
                <div class="flex-1 flex flex-col items-center">
                   <span class="text-[10px] font-black text-slate-500 mb-2 uppercase">Factor Ratio</span>
                   <InputNumber v-model="convForm.factor" class="p-inputtext-dark w-full h-12 font-black text-xl text-center" />
                </div>
                <div class="pt-6">
                   <i class="pi pi-arrow-right text-emerald-400"></i>
                </div>
                <div class="flex-1 flex flex-col items-center">
                   <span class="text-[10px] font-black text-slate-500 mb-2 uppercase">Base</span>
                   <div class="w-full h-12 rounded-xl bg-white/5 flex items-center justify-center font-black text-lg border border-white/10 uppercase italic text-emerald-400">
                      {{ uoms.find(u => u.id === convForm.toUomId)?.code || '???' }}
                   </div>
                </div>
             </div>
             <p class="text-[9px] font-bold text-slate-500 uppercase tracking-tighter italic text-center">Contoh: 1 BOX x 12 = PCS</p>
          </div>

          <div class="space-y-6">
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dari Satuan (Source)</label>
                   <Select v-model="convForm.fromUomId" :options="uoms" optionLabel="name" optionValue="id" class="w-full rounded-2xl border-slate-200" placeholder="Pilih..." />
                </div>
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ke Satuan (Target)</label>
                   <Select v-model="convForm.toUomId" :options="uoms" optionLabel="name" optionValue="id" class="w-full rounded-2xl border-slate-200" placeholder="Pilih..." />
                </div>
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="convDrawerOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Simpan Aturan" icon="pi pi-check-circle" class="p-button-rounded p-button-success font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-emerald-100" @click="saveConversion" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const activeTab = ref('master');
const uoms = ref<any[]>([]);
const conversions = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const uomDrawerOpen = ref(false);
const convDrawerOpen = ref(false);

const uomForm = ref<any>({ code: '', name: '' });
const convForm = ref<any>({ fromUomId: '', toUomId: '', factor: 1 });

const stats = computed(() => [
  { label: 'Total Unit Aktif', value: uoms.value.filter(u => u.isActive).length, sub: 'Global Scale', icon: 'pi pi-box', theme: 'emerald' as const },
  { label: 'Aturan Konversi', value: conversions.value.length, sub: 'Scaling Factors', icon: 'pi pi-refresh', theme: 'blue' as const },
  { label: 'Master Registry', value: uoms.value.length, sub: 'Database Status', icon: 'pi pi-database', theme: 'indigo' as const }
]);

const uomColumns = [
  { key: 'code', header: 'CODE', width: 'w-32' },
  { key: 'name', header: 'NAMA SATUAN' },
  { key: 'status', header: 'STATUS', align: 'center' as const, width: 'w-40', borderLeft: true },
  { key: 'actions', header: 'AKSI', align: 'right' as const, width: 'w-32', borderLeft: true }
];

const convColumns = [
  { key: 'from', header: 'FROM UNIT', width: 'w-48' },
  { key: 'factor', header: 'CONVERSION FACTOR', align: 'center' as const, borderLeft: true },
  { key: 'to', header: 'TO UNIT', width: 'w-48', borderLeft: true },
  { key: 'actions', header: 'AKSI', align: 'right' as const, width: 'w-32', borderLeft: true }
];

const tabOptions = [
  { label: 'Daftar Satuan', value: 'master', icon: 'pi pi-box' },
  { label: 'Aturan Konversi', value: 'conversions', icon: 'pi pi-refresh' }
];

async function load() {
  loading.value = true;
  try {
    const [uRes, cRes] = await Promise.all([
      api.get('/core/uoms'),
      api.get('/core/uoms/conversions')
    ]);
    uoms.value = uRes.data?.uoms || uRes.data || [];
    conversions.value = cRes.data?.conversions || cRes.data || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNewUom() {
  uomForm.value = { code: '', name: '' };
  uomDrawerOpen.value = true;
}

function openNewConversion() {
  convForm.value = { fromUomId: '', toUomId: '', factor: 1 };
  convDrawerOpen.value = true;
}

async function saveUom() {
  saving.value = true;
  try {
    await api.post('/core/uoms', uomForm.value);
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Satuan baru berhasil didaftarkan.' });
    uomDrawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function saveConversion() {
  saving.value = true;
  try {
    await api.post('/core/uoms/conversions', convForm.value);
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Aturan konversi berhasil dikonfigurasi.' });
    convDrawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function deactivateUom(uom: any) {
  try {
    await api.patch(`/core/uoms/${uom.id}/deactivate`);
    toast.add({ severity: 'warn', summary: 'Disabled', detail: 'Satuan dinonaktifkan.' });
    load();
  } catch (e) {}
}

async function deleteConversion(conv: any) {
  try {
    await api.patch(`/core/uoms/conversions/${conv.id}/delete`);
    toast.add({ severity: 'error', summary: 'Deleted', detail: 'Aturan konversi dihapus.' });
    load();
  } catch (e) {}
}

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

:deep(.p-inputtext-dark) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border-radius: 1rem !important;
}

:deep(.p-dialog-mask) {
  backdrop-filter: blur(8px);
  background: rgba(15, 23, 42, 0.4) !important;
}

:deep(.p-dialog) {
  border-radius: 2.5rem !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-dialog-header) {
  padding: 2rem 2.5rem 1rem !important;
}

:deep(.p-dialog-content) {
  padding: 0 2.5rem 2rem !important;
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-slate-200 rounded-full; }
</style>
