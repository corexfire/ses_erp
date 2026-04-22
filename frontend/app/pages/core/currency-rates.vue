<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <DashboardHero
      title="Currency Rates"
      subtitle="Monitoring nilai tukar mata uang asing terhadap mata uang dasar (Functional Currency) secara harian."
      category="Treasury & Forex"
      category-sub="Manajemen Kurs"
      color="amber"
    >
      <template #actions>
        <div class="flex items-center gap-3">               
          <Button label="Input Kurs Baru" icon="pi pi-plus" class="p-button-sm font-black text-xs px-6 bg-white/20 hover:bg-white/30 text-white border-white/20" @click="openNewRate" />
        </div>
      </template>
    </DashboardHero>

    <!-- Stats / Treasury Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <MiniStatsCard
          v-for="s in stats"
          :key="s.label"
          :label="s.label"
          :value="s.displayValue"
          :icon="s.icon"
          :sub="s.sub"
          :sub-color="s.theme"
          :icon-color="s.theme"
       />
    </div>

    <!-- Main Content Area with Tabs -->
    <!-- Main Content Area with Tabs -->
    <PanelCard
      :title="activeTab === 'rates' ? 'Histori Kurs Harian' : 'Master Mata Uang'"
      subtitle="Dataset moneter dan pencatatan nilai tukar valuta asing sistem."
      icon="pi pi-wallet"
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
          <!-- VIEW: EXCHANGE RATES HISTORY -->
          <PanelTable
            v-if="activeTab === 'rates'"
            :items="exchangeRates"
            :columns="rateColumns"
            :loading="loading"
            hover-border-color="border-l-amber-400"
          >
            <template #col-pair="{ item }">
               <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100">
                     <span class="text-[10px] font-black text-amber-600">{{ item.baseCurrency?.symbol || '?' }}</span>
                  </div>
                  <div class="flex flex-col">
                     <span class="text-[12px] font-black text-slate-900 font-mono">{{ item.baseCurrency?.code }} / {{ item.quoteCurrency?.code }}</span>
                     <span class="text-[9px] font-bold text-slate-400 uppercase leading-none mt-1">{{ item.baseCurrency?.name }}</span>
                  </div>
               </div>
            </template>
            <template #col-rate="{ item }">
               <span class="text-[13px] font-black text-slate-900 italic font-mono">
                  {{ fmtRate(item.rate) }}
               </span>
            </template>
            <template #col-date="{ item }">
               <div class="flex items-center gap-2">
                  <i class="pi pi-calendar text-[10px] text-slate-400"></i>
                  <span class="text-[11px] font-bold text-slate-600">{{ fmtDate(item.rateDate) }}</span>
               </div>
            </template>
            <template #col-updated="{ item }">
               <span class="text-[9px] font-bold text-slate-400 uppercase font-mono">{{ fmtDateTime(item.updatedAt) }}</span>
            </template>
            <template #col-actions>
               <Button icon="pi pi-chart-line" severity="secondary" rounded text />
            </template>
          </PanelTable>

          <!-- VIEW: MASTER CURRENCIES -->
          <div v-else>
             <div class="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                <h3 class="text-[9px] font-black uppercase tracking-widest text-slate-400">Supported Currencies & Functional Settings</h3>
                <Button label="Mata Uang Baru" icon="pi pi-plus" size="small" text @click="openNewCurrency" class="font-black text-[10px] uppercase tracking-widest" />
             </div>
             <PanelTable
               :items="currencies"
               :columns="currencyColumns"
               hover-border-color="border-l-blue-400"
             >
                <template #col-code="{ item }">
                   <span class="font-mono text-[11px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 italic">{{ item.code }}</span>
                </template>
                <template #col-name="{ item }">
                   <span class="text-[11px] font-black text-slate-800 uppercase tracking-tight">{{ item.name }}</span>
                </template>
                <template #col-symbol="{ item }">
                   <span class="text-xl font-black text-slate-300">{{ item.symbol }}</span>
                </template>
                <template #col-type="{ item }">
                   <span v-if="item.isBase" class="px-3 py-1 bg-blue-900 text-white text-[9px] font-black uppercase rounded-full tracking-widest">Base / Functional</span>
                   <span v-else class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Foreign Currency</span>
                </template>
                <template #col-actions="{ item }">
                   <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="!item.isBase" @click="deactivateCurrency(item)" />
                </template>
             </PanelTable>
          </div>
      </template>
    </PanelCard>

    <!-- Rate Entry Dialog -->
    <Dialog v-model:visible="rateDrawerOpen" header="Input Kurs Exchange" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-4 bg-amber-50 border border-amber-100 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-amber-600 shadow-sm border border-amber-100">
                <i class="pi pi-money-bill text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-amber-900 uppercase leading-none mb-1">Treasury Input</p>
                <p class="text-[9px] font-bold text-amber-600 uppercase italic">Masukkan dataset nilai tukar harian resmi.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Currency (Mata Uang Dasar)</label>
                <Select v-model="rateForm.quoteCurrencyId" :options="currencies.filter(cc => cc.isBase)" optionLabel="name" optionValue="id" class="w-full rounded-2xl border-slate-200" disabled />
             </div>

             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Currency</label>
                   <Select v-model="rateForm.baseCurrencyId" :options="currencies.filter(cc => !cc.isBase)" optionLabel="name" optionValue="id" class="w-full rounded-2xl border-slate-200" placeholder="Pilih Valas..." />
                </div>
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Kurs</label>
                   <InputText v-model="rateForm.rateDate" type="date" class="w-full rounded-2xl border-slate-200" />
                </div>
             </div>

             <div class="p-8 bg-slate-900 rounded-xl text-white space-y-4 shadow-xl shadow-amber-100">
                <label class="text-[10px] font-black text-amber-400 uppercase tracking-widest">Official Exchange Rate</label>
                <div class="flex items-end gap-3">
                   <span class="text-3xl font-black text-white italic">IDR</span>
                   <InputNumber v-model="rateForm.rate" :minFractionDigits="4" class="p-inputtext-dark flex-1 h-14 text-2xl font-black" placeholder="0.0000" mode="decimal" />
                </div>
                <p class="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Nilai tukar per 1 unit mata uang asing dalam Rupiah.</p>
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="rateDrawerOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Posting Kurs" icon="pi pi-check" class="p-button-rounded p-button-warning font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-amber-100" @click="saveRate" :loading="saving" />
          </div>
       </template>
    </Dialog>

    <!-- Currency Master Dialog -->
    <Dialog v-model:visible="currencyDrawerOpen" header="Registrasi Mata Uang" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-4 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                <i class="pi pi-globe text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-indigo-900 uppercase leading-none mb-1">Currency Configuration</p>
                <p class="text-[9px] font-bold text-indigo-600 uppercase italic">Tambahkan mata uang asing ke dalam sistem.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">ISO Code</label>
                   <InputText v-model="currencyForm.code" class="w-full rounded-2xl border-slate-200 font-mono uppercase" placeholder="USD / SGD" />
                </div>
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Valas</label>
                   <InputText v-model="currencyForm.name" class="w-full rounded-2xl border-slate-200" placeholder="US Dollar" />
                </div>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Simbol</label>
                   <InputText v-model="currencyForm.symbol" class="w-full rounded-2xl border-slate-200" placeholder="$ / Rp / €" />
                </div>
                <div class="flex items-center gap-2 pt-6">
                   <Checkbox v-model="currencyForm.isBase" :binary="true" />
                   <label class="text-[10px] font-black text-slate-600 uppercase">Set as Functional (Base)</label>
                </div>
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="currencyDrawerOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Simpan Mata Uang" icon="pi pi-save" class="p-button-rounded p-button-indigo font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-indigo-100" @click="saveCurrency" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const activeTab = ref('rates');
const currencies = ref<any[]>([]);
const exchangeRates = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const rateDrawerOpen = ref(false);
const currencyDrawerOpen = ref(false);

const rateForm = ref<any>({
  baseCurrencyId: '',
  quoteCurrencyId: '',
  rate: 0,
  rateDate: new Date().toISOString().slice(0, 10)
});

const currencyForm = ref<any>({
  code: '',
  name: '',
  symbol: '',
  isBase: false
});

const stats = computed(() => {
  const usdRate = exchangeRates.value.find(r => r.baseCurrency?.code === 'USD')?.rate || 0;
  const eurRate = exchangeRates.value.find(r => r.baseCurrency?.code === 'EUR')?.rate || 0;
  const baseCurrencyCode = currencies.value.find(c => c.isBase)?.code || '-';
  
  return [
    { label: 'Base Operational', displayValue: baseCurrencyCode, sub: 'Functional Currency', icon: 'pi pi-home', theme: 'blue' as const },
    { label: 'Current USD Rate', displayValue: `Rp ${fmtNumber(usdRate)}`, sub: 'vs IDR (Last Entry)', icon: 'pi pi-dollar', theme: 'emerald' as const },
    { label: 'Current EUR Rate', displayValue: `Rp ${fmtNumber(eurRate)}`, sub: 'vs IDR (Last Entry)', icon: 'pi pi-euro', theme: 'indigo' as const },
    { label: 'Forex Coverage', displayValue: currencies.value.filter(c => !c.isBase).length.toString(), sub: 'Supported Currencies', icon: 'pi pi-globe', theme: 'amber' as const }
  ];
});

const rateColumns = [
  { key: 'pair', header: 'CURRENCY PAIR', width: 'w-64' },
  { key: 'rate', header: 'EXCHANGE RATE', borderLeft: true },
  { key: 'date', header: 'VALID DATE', borderLeft: true },
  { key: 'updated', header: 'LAST UPDATED', borderLeft: true },
  { key: 'actions', header: 'AKSI', align: 'right' as const, width: 'w-32', borderLeft: true }
];

const currencyColumns = [
  { key: 'code', header: 'CODE', width: 'w-32' },
  { key: 'name', header: 'CURRENCY NAME' },
  { key: 'symbol', header: 'SYMBOL', align: 'center' as const, width: 'w-32', borderLeft: true },
  { key: 'type', header: 'TYPE', borderLeft: true },
  { key: 'actions', header: 'AKSI', align: 'right' as const, width: 'w-32', borderLeft: true }
];

const tabOptions = [
  { label: 'Histori Kurs', value: 'rates', icon: 'pi pi-history' },
  { label: 'Master Currency', value: 'master', icon: 'pi pi-database' }
];

async function load() {
  loading.value = true;
  try {
    const [cRes, rRes] = await Promise.all([
      api.get('/core/currencies'),
      api.get('/core/exchange-rates')
    ]);
    currencies.value = cRes.data?.currencies || cRes.data || [];
    exchangeRates.value = rRes.data?.exchangeRates || rRes.data || [];
    
    const base = currencies.value.find(c => c.isBase);
    if (base) rateForm.value.quoteCurrencyId = base.id;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNewRate() {
  rateForm.value.rate = 0;
  rateForm.value.baseCurrencyId = '';
  rateForm.value.rateDate = new Date().toISOString().slice(0, 10);
  rateDrawerOpen.value = true;
}

function openNewCurrency() {
  currencyForm.value = { code: '', name: '', symbol: '', isBase: false };
  currencyDrawerOpen.value = true;
}

async function saveRate() {
  saving.value = true;
  try {
    await api.post('/core/exchange-rates', rateForm.value);
    toast.add({ severity: 'success', summary: 'Kurs Diposting', detail: 'Nilai tukar berhasil diperbarui pada database.' });
    rateDrawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function saveCurrency() {
  saving.value = true;
  try {
    await api.post('/core/currencies', currencyForm.value);
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Mata uang baru berhasil didaftarkan.' });
    currencyDrawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function deactivateCurrency(curr: any) {
  try {
    await api.patch(`/core/currencies/${curr.id}/deactivate`);
    toast.add({ severity: 'warn', summary: 'Disabled', detail: 'Mata uang dinonaktifkan.' });
    load();
  } catch (e) {}
}

function fmtNumber(v: any) {
  if (!v) return '0';
  if (typeof v === 'string') return v;
  return new Intl.NumberFormat('id-ID').format(v);
}
function fmtRate(v: any) { return Number(v).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 4 }); }
function fmtDate(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { dateStyle: 'long' }) : '-' }
function fmtDateTime(d: string) { return d ? new Date(d).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-' }

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
